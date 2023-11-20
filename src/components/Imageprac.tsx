import React, { useState } from "react";

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      console.log(file);
      formData.append("file", file);

      fetch("http://localhost:8080/api/products/{id}", {
        body: formData,
        method: "POST",
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  return (
    <div>
      <h2>이미지 업로드</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">업로드</button>
      </form>
    </div>
  );
};

export default ImageUpload;
