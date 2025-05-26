
import { useState } from "react";
import { Editor } from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Write = () => {
  const [title, setTitle] = useState<string>("");
  const { toast } = useToast();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePublish = () => {
    // Here you would typically save the article to a database
    toast({
      title: "Article published",
      description: "Your article has been successfully published",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Title"
          className="w-full text-3xl font-bold focus:outline-none bg-transparent"
          value={title}
          onChange={handleTitleChange}
        />
        <Button onClick={handlePublish}>
          Publish
        </Button>
      </div>
      <Editor />
    </div>
  );
};

export default Write;
