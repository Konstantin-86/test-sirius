import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import {
  setChildName,
  setChildDOB,
  setChildGender,
  setParentName,
  setAnswer
} from "../store/questionsSlice";
import axios from "axios";

import classIcon from "../assets/classIcon.svg";
import flagIcon from "../assets/flagIcon.svg";

import RadioButton from "../components/RadioButton";
import TextField from "../components/TextField";
import ArrowIcon from "../components/ArrowIcon";
import Button from "../components/Button";

import styles from "../styles/questionsScreen.module.css";

const URL = "https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey";
const answersRadio = ["Очень редко", "Редко", "Иногда", "Часто", "Всегда"];

interface QuestionsScreenProps {
  onStart: (newScreen: string) => void;
}

interface Question {
  id: string;
  text: string;
}

interface RadioFieldData {
  section: string;
  questions: Question[];
}

interface TextFieldData {
  id: string;
  title: string;
}

const QuestionsScreen = ({ onStart }: QuestionsScreenProps) => {
  const dispatch = useDispatch();
  const questionsState = useSelector((state: RootState) => state.questions);
  const taskId = useSelector((state: RootState) => state.task.taskId);
  console.log(taskId);


  const { childName, childDOB, childGender, parentName, answers } = questionsState;
  const [fakeData, setFakeData] = useState<RadioFieldData[]>([]);
  const [textFieldData, setTextFieldData] = useState<TextFieldData[]>([]);
  const [stateButton, setStateButton] = useState(false);

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

  useEffect(() => {
    setStateButton(validateInputs());
  }, [questionsState, fakeData, textFieldData]);

  const handleRadioChange = (name: string, value: string | null) => {
    if (name === "childGender") {
      dispatch(setChildGender(value));
    } else {
      dispatch(setAnswer({ id: name, value }));
    }
  };

  const handleTextChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "childName":
        dispatch(setChildName(value));
        break;
      case "childDOB":
        dispatch(setChildDOB(value));
        break;
      case "parentName":
        dispatch(setParentName(value));
        break;
      default:
        dispatch(setAnswer({ id: fieldName, value }));
    }
  };

  const validateInputs = () => {
    const requiredFields = [
      "childName",
      "childDOB",
      "childGender",
      "parentName",
      ...fakeData.flatMap(field => field.questions.map(question => question.id)),
      ...textFieldData.map(field => field.id)
    ];

    const isValid = requiredFields.every(field => {
      if (field === "childGender") return childGender !== null;
      if (field === "childName") return childName.trim() !== '';
      if (field === "childDOB") return childDOB.trim() !== '';
      if (field === "parentName") return parentName.trim() !== '';
      return answers[field] !== undefined && answers[field] !== null && answers[field] !== '';
    });

    return isValid;
  };

  const checkInputs = () => {
    const itemsForServer = {
      survey: {
        childName,
        childDOB,
        childGender,
        parentName,
        ...answers
      },
      task_id: taskId
    };

    axios.post(URL, itemsForServer)
      .then((res) => {
        onStart("result");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className={styles.title}>Общая информация о ребенке</h2>

      <label className={styles.label}>Имя ребенка</label>
      <input
        className={styles.input}
        type="text"
        value={childName}
        onChange={(e) => handleTextChange("childName", e.target.value)}
      />

      <label className={styles.label}>Дата рождения</label>
      <input
        className={styles.inputDate}
        type="date"
        value={childDOB}
        onChange={(e) => handleTextChange("childDOB", e.target.value)}
      />

      <div>
        <label className={styles.label}>Пол ребенка</label>
        <RadioButton
          name="childGender"
          options={["Мужской", "Женский"]}
          selectedValue={childGender}
          onChange={(value) => handleRadioChange("childGender", value)}
        />
      </div>

      <label className={styles.label}>Имя родителя, заполняющего анкету</label>
      <input
        className={styles.input}
        type="text"
        value={parentName}
        onChange={(e) => handleTextChange("parentName", e.target.value)}
      />

      <div className={styles.alarmText}>
        <div className={styles.textContent}>
          <img src={classIcon} alt="classIcon" />
          <p>Пожалуйста, внимательно прочитайте каждый вопрос и выберите наиболее подходящий вариант ответа, отражающий поведение и эмоциональное состояние вашего ребенка в течение последних 2-4 недель. Отвечайте максимально честно и искренне, так как от этого зависит точность оценки психоэмоционального развития Вашего ребенка.</p>
        </div>
        <div className={styles.textContent}>
          <img src={flagIcon} alt="flagIcon" />
          <p>Все вопросы обязательны к заполнению</p>
        </div>
      </div>

      {fakeData.map((item) => (
        <div key={item.section} className={styles.innerItem}>
          <h3 className={styles.title}>{item.section}</h3>
          {item.questions.map((question) => (
            <div key={question.id}>
              <p className={styles.subTitle}>{question.text}</p>
              <RadioButton
                name={question.id}
                options={answersRadio}
                selectedValue={answers[question.id] || null}
                onChange={(value) => handleRadioChange(question.id, value)}
              />
            </div>
          ))}
        </div>
      ))}

      {textFieldData.map((item) => (
        <div key={item.id}>
          <TextField
            initialValue={item.title}
            value={answers[item.id] || ""}
            onChange={(value) => handleTextChange(item.id, value)}
          />
        </div>
      ))}

      <div className={styles.footer}>
        <div className={styles.step}>
          <p>Шаг 2/3</p>
        </div>
        <div className={styles.buttonsInner}>
          <Button
            text="К загрузке рисунков"
            accent="secondary"
            iconDirection="left"
            icon={<ArrowIcon direction="left" color="#293244" />}
            onClick={() => onStart("upload")}
          />
          <Button
            text="Узнать результаты"
            accent="secondary"
            state={stateButton ? "default" : "disabled"}
            iconDirection="right"
            icon={<ArrowIcon direction="right" color={stateButton ? "#293244" : "#C7C7C7"} />}
            onClick={checkInputs}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionsScreen;