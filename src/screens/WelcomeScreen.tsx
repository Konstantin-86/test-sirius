import Button from "../components/Button";
import styles from "../styles/welcomeScreen.module.css";

interface WelcomeScreenProps {
  onStart: (newScreen: string) => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className={styles.inner}>
      <h1>Test Sirius</h1>
      <Button text="Start" onClick={() => onStart("upload")} iconDirection="right" />
    </div>
  );
};

export default WelcomeScreen;
