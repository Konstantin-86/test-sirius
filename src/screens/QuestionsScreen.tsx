import { useState, useEffect } from "react";
import RadioButton from "../components/RadioButton";
import TextField from "../components/TextField";
import Button from "../components/Button";
import arrow from "../assets/arrowLeft.png";
import arrow2 from "../assets/arrow2Forward.png";

interface QuestionsScreenProps {
  onStart: (newScreen: string) => void;
}
interface Answer {
  questionTitle: string;
  answers: string[];
}

interface Section {
  title: string;
  questions: Answer[];
}
interface TextFieldData {
  title: string;
}

const QuestionsScreen = ({ onStart }: QuestionsScreenProps) => {
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | null>
  >({});
  const [stateButton, setStateButton] = useState(false);
  const [fakeData, setFakeData] = useState<Section[]>([]);
  const [textFieldData, setTextFieldData] = useState<TextFieldData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRadioText = await import("../../data/mok.json");
        const responseTextField = await import("../../data/textFiled.json");
        setFakeData(responseRadioText.default);
        setTextFieldData(responseTextField.default);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleRadioChange = (name: string, value: string | null) => {
    setSelectedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const checkInputs = () => {
    console.log(selectedValues);
    onStart("result");
  };

  return (
    <div>
      <h2>Общая информация о ребенке</h2>
      <label htmlFor="">
        Имя ребенка <input type="text" />
      </label>

      <label htmlFor="">
        Дата рождения <input type="date" />
      </label>
      <div className="">
        <label>
          Пол ребенка
          <RadioButton
            name="Пол ребенка"
            options={["Мужской", "Женский"]}
            onChange={(value) => handleRadioChange("Пол ребенка", value)}
          />
        </label>
      </div>
      <label htmlFor="">
        Имя родителя, заполняющего анкету <input type="text" />
      </label>

      {fakeData.map((item) => {
        return (
          <div key={item.title}>
            <h3>{item.title}</h3>
            {item.questions.map((question) => (
              <div className="inner" key={question.questionTitle}>
                <h3>{question.questionTitle}</h3>
                <RadioButton
                  name={question.questionTitle}
                  options={question.answers}
                  onChange={(value) =>
                    handleRadioChange(question.questionTitle, value)
                  }
                />
              </div>
            ))}
          </div>
        );
      })}
      {textFieldData.map((item) => {
        return (
          <div key={item.title}>
            <TextField
              initialValue={item.title}
              onChange={(value) => handleRadioChange(item.title, value)}
            />
          </div>
        );
      })}
      <Button
        text="К загрузке рисунков"
        accent="secondary"
        iconDerection="left"
        icon={arrow}
        onClick={() => onStart("upload")}
      />
      <Button
        text="К загрузке рисунков"
        accent="primary"
        state={stateButton ? "disabled" : "default"}
        iconDerection="right"
        icon={arrow2}
        onClick={checkInputs}
      />
    </div>
  );
};

export default QuestionsScreen;
