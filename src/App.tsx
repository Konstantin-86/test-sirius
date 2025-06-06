import { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import PhotoUploadScreen from "./screens/PhotoUploadScreen";
import QuestionsScreen from "./screens/QuestionsScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome"); // 'welcome' | 'upload' | 'questions' | 'result'

  return (
    <div>
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={() => setCurrentScreen("upload")} />
      )}

      {currentScreen === "upload" && (
        <PhotoUploadScreen onStart={() => setCurrentScreen("questions")} />
      )}

      {currentScreen === "questions" && (
        <QuestionsScreen onStart={() => setCurrentScreen("result")} />
      )}
    </div>
  );
}

export default App;
