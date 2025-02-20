import BlogInput from '@/components/blog-input'
import { BlogProvider } from '@/context/UserBlogsContext'
import React from 'react'

const CreateBlog = () => {
  return (
    <BlogProvider>
      <div className='flex flex-col w-[1000px] mx-auto'>
        <h1 className='font-semibold text-2xl px-2'>Create Blog</h1>
        <div className='w-full'>
          <BlogInput />
        </div>
      </div>
    </BlogProvider>
  )
}

export default CreateBlog
