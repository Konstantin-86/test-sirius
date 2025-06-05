import { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import PhotoUploadScreen from "./screens/PhotoUploadScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome"); // 'welcome' | 'upload' | 'questions' | 'result'

  return (
    <div>
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={() => setCurrentScreen("upload")} />
      )}

      {currentScreen === "upload" && <PhotoUploadScreen onStart={() => setCurrentScreen("questions")} />}

    </div>
  );
}

export default App;
