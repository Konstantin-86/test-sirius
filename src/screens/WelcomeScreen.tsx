import styles from "../styles/welcomeScreen.module.css";

interface WelcomeScreenProps {
  onStart: (newScreen: string) => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className={styles.container}>
      <h1>Test Sirius</h1>
      <button onClick={() => onStart("upload")}>Start</button>
    </div>
  );
};

export default WelcomeScreen;
