"use client"

import EditBlogForm from '@/components/edit-blog-input';
import { BlogProvider } from '@/context/UserBlogsContext';

const EditBlogPage = () => {
  return (
    <BlogProvider>
      <div className='flex flex-col w-[1000px] mx-auto'>
        <h1 className='font-semibold text-2xl px-2'>Edit Blog</h1>
        <div className='w-full'>
          <EditBlogForm />
        </div>
      </div>
    </BlogProvider>
  );
}

export default EditBlogPage