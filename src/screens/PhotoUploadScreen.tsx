import { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "../components/Button";

interface PhotoUploadScreenProps {
  onStart: () => void;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

const PhotoUploadScreen = ({ onStart }: PhotoUploadScreenProps) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!allowedTypes.includes(file.type)) {
        setError(`Недопустимый формат файла. Разрешены: JPG, JPEG, PNG, PDF.`);
        return;
      }

      if (file.size > maxSizeBytes) {
        setError(`Файл слишком большой. Максимальный размер: ${maxSizeMB} МБ.`);
        return;
      }

      if (uploadedFile) {
        URL.revokeObjectURL(uploadedFile.preview);
      }

      const newFile = {
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: file.type.includes("image") ? URL.createObjectURL(file) : "",
      };

      setUploadedFile(newFile);
    }
  };

  return (
    <div className="photo-upload-container">
      <h2>Upload photo</h2>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
      />

      {error && (
        <div
          className="error-message"
          style={{ color: "red", margin: "10px 0" }}
        >
          {error}
        </div>
      )}

      {uploadedFile && (
        <div key={uploadedFile.id} className="preview-item">
          {uploadedFile.preview ? (
            <img
              src={uploadedFile.preview}
              alt="Preview"
              className="preview-image"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          ) : (
            <div className="pdf-preview">
              PDF file: {uploadedFile.file.name}
            </div>
          )}
        </div>
      )}

      <Button state="disabled" text="Далее" onClick={onStart} />
    </div>
  );
};

export default PhotoUploadScreen;
