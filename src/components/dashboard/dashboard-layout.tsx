"use client"

import { useState } from "react";
import BlogCard from "@/components/blog-card";
import PaginationComponent from "@/components/pagination";
import Blog from "@/types/blog-types";
import Markdown from "react-markdown";
import "github-markdown-css";

interface DashboardProps {
  blogs: Blog[];
}

const DashboardLayout = ({ blogs }: DashboardProps) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const totalPages = Math.ceil(blogs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return (
    <div className={`flex flex-col ${selectedBlog ? 'md:flex-row' : ''} gap-8 w-full py-8 min-h-screen`}>
      <div className={`w-full ${selectedBlog ? 'md:w-1/2' : ''} px-4 space-y-8`}>
        <h1 className="font-semibold text-4xl text-center">Blogs Stream</h1>
        <div className="flex flex-col gap-2">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={String(blog.id)}
                title={blog.title}
                description={blog.description}
                creator={blog.user?.fullname || "Unknown"}
                publishedDate={blog.created_at ? new Date(blog.created_at).toLocaleDateString() : ''}
                onClick={(id) => setSelectedBlog(blogs.find(b => b.id === id) || null)}
                isSelected={selectedBlog?.id === blog.id}
              />
            ))
          ) : (
            <p className="text-center">No blogs available.</p>
          )}
        </div>
        {totalPages > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {selectedBlog && (
        <div className={`w-full ${selectedBlog ? 'md:w-1/2' : ''} px-4 md:px-8 py-6 overflow-y-auto`}>
          <div className="sticky top-0 bg-white">
            <button
              onClick={() => setSelectedBlog(null)}
              className="mb-4 text-gray-500 hover:text-gray-700"
            >
            </button>
            <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>
              <div className="text-sm text-gray-500 mb-6">
                By {selectedBlog.users?.fullname || "Unknown"} - 
                {selectedBlog.created_at ? new Date(selectedBlog.created_at).toLocaleDateString() : ""}
              </div>
          </div>
          <div className="prose prose-lg max-w-full">
            <Markdown className="markdown-body p-5">{selectedBlog.body}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;