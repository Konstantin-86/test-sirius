import styles from "../styles/welcomeScreen.module.css";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className={styles.container}>
      <h1>Test Sirius</h1>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default WelcomeScreen;
