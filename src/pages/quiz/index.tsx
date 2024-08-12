import { useFieldArray, useForm } from "react-hook-form";
import QuizSideBar from "./components/sidebar";
import { QuizContainer, QuizDock } from "./styles";
import { dimensionModel } from "./quiz.interface";
import FormGroup from "../defaulForm/components/Group";

const QuizScreen = () => {
  const formMethods = useForm<dimensionModel>();

  const questionsFieldArray = useFieldArray({
    name: "questions",
    control: formMethods.control,
  });

  const onSubmit = formMethods.handleSubmit((data) => {
    console.log(data);

    localStorage.setItem("questionario1", JSON.stringify(data));
  });

  return (
    <QuizContainer>
      <QuizSideBar
        formMethods={formMethods}
        fieldsArray={questionsFieldArray}
      />
      <section className="quiz-form-content">
        <FormGroup
          formMethods={formMethods}
          fieldsArray={questionsFieldArray}
        />
        <QuizDock>
          <button type="button" className="save-button" onClick={onSubmit}>
            Salvar Questionário
          </button>
        </QuizDock>
      </section>
    </QuizContainer>
  );
};

export default QuizScreen;
