import React, {FC} from 'react'
import { CircleX, Info, CircleCheck } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from './button';

interface AlertPopOutProps {
  title: string;
  description: string;
  type: "default" | "destructive" | null | undefined;
  open: boolean;
  onClose: () => void;
}

const AlertPopOut: FC<AlertPopOutProps> = ({title, description, type, open, onClose}) => {
  const getIcon = () => {
    switch (type) {
      case "destructive":
        return <CircleX className="h-4 w-4 text-red-500" />;
      case "default":
        return <CircleCheck className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 space-y-4">
        <DialogHeader className="flex items-center space-x-2">
          {getIcon()}
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AlertPopOut
