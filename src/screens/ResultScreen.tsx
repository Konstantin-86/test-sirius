import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import axios from "axios";

const URL = `https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/`

const ResultScreen = () => {


  const taskId = useSelector((state: RootState) => state.task.taskId);
  const [status, setStatus] = useState<{
    state: "processing" | "ready" | "error";
    message: string;
    pdfUrl?: string;
  }>({ state: "processing", message: "Анализ в процессе..." });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) {
      setError("Отсутствует taskId");
      return;
    }
    const intervalId = setInterval(checkReportStatus, 10000);
    checkReportStatus();
    return () => clearInterval(intervalId);
  }, [taskId]);

  const checkReportStatus = async () => {
    try {
      const response = await axios.get(`${URL}${taskId}`);

      if (response.data.status === "ready") {
        setStatus({
          state: "ready",
          message: "Отчет готов!",
          pdfUrl: response.data.pdf_url
        });
      } else {
        setStatus({
          state: "processing",
          message: "Анализ в процессе..."
        });
      }
    } catch (err) {
      console.error("Ошибка при проверке статуса:", err);
      setStatus({
        state: "error",
        message: "Произошла ошибка при получении отчета"
      });
      setError(
        axios.isAxiosError(err)
          ? `Ошибка ${err.response?.status}: ${err.response?.data?.message || err.message}`
          : "Неизвестная ошибка"
      );
    }
  };
  if (error) return <p>{error}</p>;



  return <div>
    <h2>Результаты анализа</h2>
    {status.state === "processing" && <p>{status.message}</p>}
    {status.state === "ready" && status.pdfUrl && <p>Отчет готов! <a href={status.pdfUrl}>Скачать</a></p>}
  </div>;
};

export default ResultScreen;
