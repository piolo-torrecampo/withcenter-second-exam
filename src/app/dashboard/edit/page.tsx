'use client';

import { Suspense } from 'react';
import EditBlogForm from '@/components/edit/edit-form';

const EditBlogPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlogForm />
    </Suspense>
  );
};

export default EditBlogPage;