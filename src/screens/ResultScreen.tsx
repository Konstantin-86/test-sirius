import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const ResultScreen = () => {
  const taskId = useSelector((state: RootState) => state.task.taskId);
  return <div>{taskId}</div>;
};

export default ResultScreen;
