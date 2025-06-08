import { useState, useEffect } from "react";
import styles from "../styles/progressBar.module.css";

interface ProgressBarProps {
    currentScreen: string;
}

const ProgressBar = ({ currentScreen }: ProgressBarProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        switch (currentScreen) {
            case "welcome":
                setProgress(0);
                break;
            case "upload":
                setProgress(25);
                break;
            case "questions":
                setProgress(50);
                break;
            case "result":
                setProgress(100);
                break;
            default:
                setProgress(0);
        }
    }, [currentScreen]);

    return (
        <div className={styles.progressBar} style={progress === 0 ? { visibility: "hidden" } : { visibility: "visible" }}>
            <div className={styles.progress} style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ProgressBar;