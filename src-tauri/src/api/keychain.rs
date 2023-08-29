use keyring::Entry;

#[tauri::command]
pub fn get_keychain_value(key: &str) -> Result<String, String> {
    let entry = Entry::new("tb", key).map_err(|e| e.to_string())?;
    let password = entry.get_password().map_err(|e| e.to_string())?;
    Ok(password)
}

#[tauri::command]
pub fn set_keychain_value(key: &str, value: &str) -> Result<(), String> {
    let entry = Entry::new("tb", key).map_err(|e| e.to_string())?;
    entry.set_password(value).map_err(|e| e.to_string())?;
    Ok(())
}
