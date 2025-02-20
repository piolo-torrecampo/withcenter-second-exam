"use client";

import { useState } from "react";
import { useBlog } from "@/context/UserBlogsContext";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import "github-markdown-css";
import AlertPopOut from "@/components/ui/alert-popout";

const BlogInput = () => {
  const { addNewBlog } = useBlog();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [alert, setAlert] = useState<{ message: string; type: "default" | "destructive" } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showAlert = (message: string, type: "default" | "destructive") => {
    setAlert({ message, type });
  };

  const isInputValid = (): boolean => {
    if (!title || !description || !body) {
      showAlert("All fields are required.", "destructive");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!isInputValid()) return;

    try {
      setLoading(true);
      await addNewBlog({ title, description, body });
      
      setTitle("")
      setDescription("")
      setBody("")

      showAlert("Blog saved successfully!", "default");
    } catch {
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
    </div>
  );
};

export default BlogInput;
