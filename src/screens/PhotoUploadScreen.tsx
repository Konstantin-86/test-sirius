import { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTaskId } from "../store/taskSlice";
import Button from "../components/Button";
import arrow from "../assets/arrowLeft.png";

interface PhotoUploadScreenProps {
  onStart: (newScreen: string) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

const PhotoUploadScreen = ({ onStart }: PhotoUploadScreenProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setError(null);

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        if (!allowedTypes.includes(file.type)) {
          setError(`Недопустимый формат файла. Разрешены: JPG, JPEG, PNG.`);
          return;
        }

        if (file.size > maxSizeBytes) {
          setError(
            `Файл слишком большой. Максимальный размер: ${maxSizeMB} МБ.`
          );
          return;
        }

        const newFiles = [...uploadedFiles];
        if (newFiles[index]) {
          URL.revokeObjectURL(newFiles[index].preview);
        }

        const newFile = {
          id: Math.random().toString(36).substring(2, 9),
          file,
          preview: URL.createObjectURL(file),
        };

        newFiles[index] = newFile;
        setUploadedFiles(newFiles);
      }
    };

  const handleNextClick = async () => {
    if (uploadedFiles.length < 3 || uploadedFiles.some((file) => !file)) {
      setError("Пожалуйста, загрузите все три изображения");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      uploadedFiles.forEach((fileObj) => {
        formData.append(`files`, fileObj.file);
      });

      const response = await axios.post(
        "https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const taskId = response.data.task_id;
      dispatch(setTaskId(taskId));
      console.log("Upload successful, task ID:", taskId);
      onStart("questions");
    } catch (err) {
      setError("Произошла ошибка при загрузке файлов");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled =
    uploadedFiles.length < 3 ||
    uploadedFiles.some((file) => !file) ||
    isSubmitting;

  return (
    <div className="photo-upload-container">
      <h2>Загрузите три фотографии</h2>

      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="upload-group"
          style={{ marginBottom: "20px" }}
        >
          <label style={{ display: "block", marginBottom: "8px" }}>
            Фотография {index + 1}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange(index)}
              style={{ display: "block", marginTop: "4px" }}
            />
          </label>

          {uploadedFiles[index] && (
            <div className="preview-container" style={{ marginTop: "10px" }}>
              <img
                src={uploadedFiles[index].preview}
                alt={`Preview ${index + 1}`}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
        </div>
      ))}

      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

      <Button
        state={isButtonDisabled ? "disabled" : "default"}
        accent="secondary"
        icon={arrow}
        iconDerection="right"
        text={isSubmitting ? "Отправка..." : "Отправить фото"}
        onClick={handleNextClick}
      />
    </div>
  );
};

export default PhotoUploadScreen;
