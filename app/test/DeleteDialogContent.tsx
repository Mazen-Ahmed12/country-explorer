// components/DeleteDialogContent.tsx
"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

export default React.memo(function DeleteDialogContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
      </DialogHeader>
      <p>This action cannot be undone.</p>
      <Button variant="destructive">Yes, delete</Button>
    </>
  );
});