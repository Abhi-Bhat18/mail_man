"use client";
import React, { useState } from "react";

// Define the props type
interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateFile(file);
    }
  };

  const validateFile = (file: File) => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    if (file.type !== "text/csv") {
      setError("Only CSV files are allowed.");
      setSelectedFile(null);
      return;
    }

    if (file.size === 0) {
      setError("File cannot be empty.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError("");
    onFileSelect(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full bg-card border-dashed rounded-lg border flex justify-center items-center"
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
        id="fileUpload"
      />
      <label
        htmlFor="fileUpload"
        className="cursor-pointer w-full h-[250px] flex flex-col justify-center items-center"
      >
        <p className="-mt-5">
          Drag and drop a CSV file here, or click to select a file
        </p>
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      </label>
    </div>
  );
};

export default FileUpload;
