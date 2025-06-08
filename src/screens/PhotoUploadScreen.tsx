import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import { useDispatch, useSelector, } from "react-redux";
import type { RootState } from "../store/store";
import { updateUploaded, } from "../store/fileSlice";
import { setTaskId } from "../store/taskIdSlice";
import Button from "../components/Button";
import alarmIcon from "../assets/alarmIcon.png";
import downloadIcon from "../assets/downloadIconVector.svg";
import refreshIcon from "../assets/refreshIcon.svg";
import styles from "../styles/photoUploadScreen.module.css";
import ArrowIcon from "../components/ArrowIcon";
import type { FileMetadata } from "../types/types";

interface PhotoUploadScreenProps {
  onStart: (newScreen: string) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}
const textImg = ["Дом, дерево, человек", "Несуществующее животное", "Автопортрет"];

const PhotoUploadScreen = ({ onStart }: PhotoUploadScreenProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Далее");
  const dispatch = useDispatch();

  const currentTaskId = useSelector((state: RootState) => state.task.taskId);
  const uploadedFilesMetadata = useSelector((state: RootState) =>
    state.file.uploadedFilesMetadata);

  const [localFiles, setLocalFiles] = useState<UploadedFile[]>(() => {
    if (!uploadedFilesMetadata || uploadedFilesMetadata.length === 0) {
      return Array(3).fill(null);
    }

    return uploadedFilesMetadata.map(meta => ({
      id: meta.id,
      file: new File([], meta.name, {
        type: meta.type,
        lastModified: meta.lastModified
      }),
      preview: meta.preview
    }));
  });
  useEffect(() => {
    const allFilesUploaded = localFiles.every(file => file !== null);
    setIsButtonDisabled(!allFilesUploaded);

  }, [localFiles]);

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!allowedTypes.includes(file.type)) {
        setError(`Недопустимый формат файла. Разрешены: JPG, JPEG, PNG.`);
        return;
      }

      if (file.size > maxSizeBytes) {
        setError(`Файл слишком большой. Максимальный размер: ${maxSizeMB} МБ.`);
        return;
      }

      const newFiles = [...localFiles];
      if (newFiles[index]) {
        URL.revokeObjectURL(newFiles[index].preview);
      }

      const newFile = {
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
      };

      newFiles[index] = newFile;
      setLocalFiles(newFiles);

      const metadata: FileMetadata = {
        id: newFile.id,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        preview: newFile.preview
      };

      dispatch(updateUploaded({ index, metadata }));
    }
  };

  const handleNextClick = async () => {
    setIsButtonDisabled(true);
    setButtonText("Загрузка...");
    if (currentTaskId) {
      onStart("questions");
      return;
    }


    if (localFiles.length < 3 || localFiles.some(file => !file)) {
      setError("Пожалуйста, загрузите все три изображения");
      setIsButtonDisabled(false);
      setButtonText("Далее");
      return;
    }

    setError(null);
    try {
      const formData = new FormData();
      localFiles.forEach(fileObj => {
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
      onStart("questions");
    } catch (err) {
      setError("Произошла ошибка при загрузке файлов");
      setIsButtonDisabled(false);
      setButtonText("Далее");
    }
    finally {
      setIsButtonDisabled(false);
      setButtonText("Далее");
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Загрузите фотографии рисунков</h2>
      <div className={styles.warning}>
        <img src={alarmIcon} alt="alarmIcon" />
        <p>Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб</p>
      </div>
      <div className={styles.innerItem}>
        {textImg.map((item, index) => (
          <div key={item} className={styles.item}>
            <label className={styles.label}>
              <img
                className={styles.downloadIcon}
                src={localFiles[index] ? refreshIcon : downloadIcon}
                alt="downloadIcon"
              />
              {localFiles[index] && (
                <img
                  className={styles.preview}
                  src={localFiles[index].preview}
                  alt={`Preview ${index + 1}`}
                />
              )}
              <input
                className={styles.input}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange(index)}
              />
            </label>
            <p className={styles.text}>{item}</p>
          </div>
        ))}
      </div>
      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}
      <div className={styles.footer}>
        <div className={styles.step}>
          <p>Шаг 1/3</p>
        </div>
        <Button
          text={buttonText}
          onClick={handleNextClick}
          iconDirection="right"
          state={isButtonDisabled ? "disabled" : "default"}
          icon={<ArrowIcon direction="right" color={isButtonDisabled ? "rgba(68, 83, 113, 0.5)" : "rgb(255, 255, 255)"} />}
        />
      </div>
    </div>
  );
};

export default PhotoUploadScreen;