import Layout from '@/components/main-layout';
import { cn } from '@/lib/utils';
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
  className,
}: {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLElement>['className'];
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
      <Layout>
        <div className={cn('', className)}>{children}</div>
      </Layout>
    </WorkflowContext.Provider>
  );
}
