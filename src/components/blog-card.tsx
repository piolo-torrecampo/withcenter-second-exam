"use client"

import Blog from "@/types/blog-types";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  creator: string;
  publishedDate: string;
  onClick: (id: string) => void;
  isSelected?: boolean;
}

const BlogCard = ({
  id,
  title,
  description,
  creator,
  publishedDate,
  onClick,
  isSelected = false
}: BlogCardProps) => {
  return (
    <div 
      className={`border rounded-lg p-4 transition-all cursor-pointer ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
      onClick={() => onClick(id)}
    >
      <h3 className={`text-xl font-semibold mb-2 ${
        isSelected ? 'text-blue-600' : 'text-gray-800'
      }`}>
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {description}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>By {creator}</span>
        <span>Published: {publishedDate}</span>
      </div>
    </div>
  );
};

export default BlogCard;