import Layout from '@/components/main-layout';
import React from 'react';

export interface WorkflowContextProps {
  // CREATE
  openCreateDialog: boolean;
  setOpenCreateDialog: React.Dispatch<React.SetStateAction<boolean>>;
  // UPDATE
  openUpdateDialog: boolean;
  setOpenUpdateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkflowContext = React.createContext<WorkflowContextProps>(
  {} as WorkflowContextProps
);

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [openCreateDialog, setOpenCreateDialog] =
    React.useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] =
    React.useState<boolean>(false);

  return (
    <WorkflowContext.Provider
      value={{
        openCreateDialog,
        setOpenCreateDialog,
        openUpdateDialog,
        setOpenUpdateDialog,
      }}
    >
      <Layout>{children}</Layout>
    </WorkflowContext.Provider>
  );
}
