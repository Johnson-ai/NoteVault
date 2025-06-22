import React, { useState } from "react";
import axios from "axios";

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setUploadStatus("You must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await axios.post("http://localhost:5050/api/user/upload-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadStatus("Profile picture uploaded successfully.");
    } catch (error) {
      setUploadStatus("Upload failed. Try again.");
    }
  };

  return (
    <div className="mt-6">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
        Upload
      </button>
      {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
    </div>
  );
};

export default ProfilePictureUpload;
