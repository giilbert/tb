export interface Extension {
  name: string;
  group: React.FC;
  pages?: [
    {
      path: string;
      component: React.FC;
    }
  ];
}

export type CreateExtension = () => Extension;
