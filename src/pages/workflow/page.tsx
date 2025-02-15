import Layout from '@/components/main-layout';
import UtilityBar from '@/features/workflow/components/utility-bar';
import React from 'react';

export default function Workflow(): React.ReactNode {
  return (
    <Layout>
      <UtilityBar create={{ form: <h1>Test Form</h1> }} />
    </Layout>
  );
}
