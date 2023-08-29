#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod api;

use tauri::Manager;
use tokio::{fs::try_exists, net::UnixDatagram};

const SOCKET_PATH: &str = if cfg!(debug_assertions) {
    "/tmp/tb-debug.sock"
} else {
    "/tmp/tb.sock"
};

fn run_application() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            api::applications::get_all_applications,
            api::applications::launch_application,
            api::keychain::get_keychain_value,
            api::keychain::set_keychain_value,
        ])
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            if cfg!(debug_assertions) {
                let _ = window.set_always_on_top(false);
            }
            Ok(())
        })
        .on_page_load(|window, _| {
            let _: tokio::task::JoinHandle<anyhow::Result<()>> = tokio::spawn(async move {
                let _ = tokio::fs::remove_file(SOCKET_PATH).await;

                let sock = UnixDatagram::bind(SOCKET_PATH)?;

                let buf = &mut [0; 1024];

                loop {
                    let length = sock.recv(buf).await?;
                    if length > 0 {
                        window.show()?;
                    }
                }

                // Ok::<_, anyhow::Error>(())
            });
        })
        .on_window_event(|event| {
            if cfg!(debug_assertions) {
                return;
            }

            if let tauri::WindowEvent::CloseRequested { api, .. } = event.event() {
                api.prevent_close();
                event.window().hide().expect("unable to hide window");
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/// returns Ok(false) if the application is already running and successfully opened
/// returns Ok(true) if the application is not running
/// returns Err if there was an error
async fn open_existing_application() -> anyhow::Result<bool> {
    if !try_exists(SOCKET_PATH).await? {
        return Ok(true);
    }

    let socket = UnixDatagram::unbound()?;
    if socket.connect(SOCKET_PATH).is_err() {
        return Ok(true);
    }

    socket.send(b"open sesame").await.unwrap();

    return Ok(false);
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    if open_existing_application().await? {
        run_application();
    }

    Ok(())
}
