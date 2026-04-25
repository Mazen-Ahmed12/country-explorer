"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

const DeleteDialogContent = dynamic(() => import("./DeleteDialogContent"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const preloadDeleteDialog = () => {
  import("./DeleteDialogContent");
};
export default function TestPage() {
  function toggle() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <div className="bg-gray-900 dark:bg-white text-black dark:text-white p-6">
      <h1 className="text-gray-100 dark:text-gray-800">Hello</h1>
      <button
        onClick={toggle}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle
      </button>
      <div>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Mazen Ahmed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Frontend Developer</p>
            <Input placeholder="Send a message..." />
            <Button className="mt-3 w-full">Connect</Button>
          </CardContent>
        </Card>
      </div>
      <div>
        <Dialog >
          <DialogTrigger
            render={
              <Button variant="destructive" onMouseEnter={preloadDeleteDialog}>
                Delete
              </Button>
            }
          />
          <DialogContent>
            <DeleteDialogContent />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
