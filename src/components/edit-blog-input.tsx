"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Markdown from "react-markdown";
import "github-markdown-css";
import AlertPopOut from "./ui/alert-popout";
import { useParams } from "next/navigation";
import { useBlog } from "@/context/UserBlogsContext"; 

const EditBlogForm = () => {
  const { blogId } = useParams<{ blogId: string }>();
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

  const blog = blogs.find((b: any) => b.id === parseInt(blogId));

  useEffect(() => {
    if (!blogId) return;
    

    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setBody(blog.body);
      setFetching(false);
    } 
  }, [blogId, blogs]);

  const handleSave = async () => {
    if (!title || !description || !body) {
      showAlert("All fields are required.", "destructive");
      return;
    }

    try {
      setLoading(true);
      await editBlog({ id: parseInt(blogId), title, description, body });
      showAlert("Blog saved successfully!", "default");
    } catch (err) {
      showAlert("Failed to save the blog. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default EditBlogForm;
