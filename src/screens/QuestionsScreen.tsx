import { useState, useEffect } from "react";
import RadioButton from "../components/RadioButton";
import TextField from "../components/TextField";

interface QuestionsScreenProps {
  onStart: () => void;
}
interface Answer {
  questionTitle: string;
  answers: string[];
}

interface Section {
  title: string;
  questions: Answer[];
}

const QuestionsScreen = ({ onStart }: QuestionsScreenProps) => {
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | null>
  >({});
  const [fakeData, setFakeData] = useState<Section[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import("../../data/mok.json");
        setFakeData(response.default);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  console.log(fakeData);

  const handleRadioChange = (name: string, value: string | null) => {
    setSelectedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(selectedValues);

  return (
    <div>
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
      <TextField
        initialValue="Есть ли у Вашего ребенка какие-либо особенности развития или поведения, о которых Вы хотели бы сообщить дополнительно?"
        onChange={(value) =>
          handleRadioChange(
            "Есть ли у Вашего ребенка какие-либо особенности развития или поведения, о которых Вы хотели бы сообщить дополнительно?",
            value
          )
        }
      />
    </div>
  );
};

export default QuestionsScreen;
