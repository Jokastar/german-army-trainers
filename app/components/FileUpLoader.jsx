"use client";
import { useState } from "react";
import { FileUploaderMinimal } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

const pubKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;

export default function FileUpLoader({ setFiles, setImgError }) {
  const [error, setError] = useState(null);
  const [uploadedUUIDs, setUploadedUUIDs] = useState([]); // Track uploaded file UUIDs to prevent duplicates

  // Handle file changes (triggered when files are added/removed/changed)
  const handleChangeEvent = (e) => {
    const newFiles = e.allEntries
      .filter((file) => file.status === "success") // Ensure the file upload is complete
      .filter((file) => !uploadedUUIDs.includes(file.uuid)) // Only add new files
      .map((file) => file.cdnUrl); // Extract the cdnUrl

    // Update file list and UUIDs
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setUploadedUUIDs((prevUUIDs) => [
      ...prevUUIDs,
      ...e.allEntries.map((file) => file.uuid), // Track UUIDs to prevent duplicates
    ]);
  };

  // Handle upload failure
  const handleUploadFailed = (e) => {
    setError(e.errors[0]);
  };

  return (
    <>
      <FileUploaderMinimal
        pubkey={pubKey}
        onChange={handleChangeEvent} // Use onChange to handle successful uploads
        onFileUploadFailed={handleUploadFailed} // Handle errors
      />
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}