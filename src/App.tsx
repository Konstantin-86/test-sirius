import { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import PhotoUploadScreen from "./screens/PhotoUploadScreen";
import QuestionsScreen from "./screens/QuestionsScreen";
import ResultScreen from "./screens/ResultScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome"); // 'welcome' | 'upload' | 'questions' | 'result'
  const onStart = (newScreen: string) => {
    setCurrentScreen(newScreen);
  };

  return (
    <div>
      {currentScreen === "welcome" && <WelcomeScreen onStart={onStart} />}

      {currentScreen === "upload" && <PhotoUploadScreen onStart={onStart} />}

      {currentScreen === "questions" && <QuestionsScreen onStart={onStart} />}

      {currentScreen === "result" && <ResultScreen />}
    </div>
  );
}

export default App;
