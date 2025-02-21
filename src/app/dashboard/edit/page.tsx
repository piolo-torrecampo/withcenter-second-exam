"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import "github-markdown-css";
import AlertPopOut from "@/components/ui/alert-popout";
import { useSearchParams } from "next/navigation";
import { useBlog } from "@/context/UserBlogsContext"; 
import Blog from "@/types/blog-types";
import { BlogProvider } from "@/context/UserBlogsContext";

const EditBlogForm = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id"); 

  const { blogs, editBlog } = useBlog();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [alert, setAlert] = useState<{ message: string; type: "default" | "destructive" } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const showAlert = (message: string, type: "default" | "destructive") => {
    setAlert({ message, type });
  };

  const blog = blogs.find((b: Blog) => b.id === parseInt(blogId || "0"));

  useEffect(() => {
    if (!blogId) return;
    
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setBody(blog.body);
      setFetching(false);
    } 
  }, [blogId, blog]);

  const handleSave = async () => {
    if (!title || !description || !body) {
      showAlert("All fields are required.", "destructive");
      return;
    }
  
    if (
      blog &&
      blog.title === title &&
      blog.description === description &&
      blog.body === body
    ) {
      showAlert("No changes made.", "default");
      return;
    }
  
    try {
      setLoading(true);
      await editBlog({ id: parseInt(blogId || "0"), title, description, body });
      showAlert("Blog saved successfully!", "default");
    } catch (err) {
      showAlert(`Failed to save the blog. ${err}`, "destructive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BlogProvider>
        <div className='flex flex-col w-[1000px] mx-auto'>
          <h1 className='font-semibold text-2xl px-2'>Edit Blog</h1>
          <div className='w-full'>
            <div className="w-full flex flex-col gap-3 p-2">
              {alert && (
                <AlertPopOut
                  title={alert.type === "destructive" ? "Error" : "Success"}
                  description={alert.message}
                  type={alert.type}
                  open={true}
                  onClose={() => setAlert(null)}
                />
              )}

              {fetching ? (
                <div className="text-center text-gray-500">Loading blog...</div>
              ) : (
                <>
                  <Card className="flex flex-col gap-2 w-full p-3">
                    <Label className="text-md font-semibold">Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
                    <Label className="text-md font-semibold">Description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" />
                  </Card>
                  <Card className="w-full p-3">
                    <Label className="text-md font-semibold">Body</Label>
                    <div className="flex flex-row gap-4 w-full">
                      <div className="flex-1">
                        <Label>Markdown</Label>
                        <Textarea className="w-full h-64" value={body} onChange={(e) => setBody(e.target.value)} />
                      </div>
                      <div className="flex-1">
                        <Label>Preview</Label>
                        <div className="w-full h-64 p-2 border rounded overflow-auto markdown-body">
                          <Markdown className="markdown-body">{body}</Markdown>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <div className="flex justify-end w-full">
                    <Button className="mt-3" onClick={handleSave} disabled={loading}>
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </div>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </BlogProvider>
    </>
  );
};

export default EditBlogForm;
