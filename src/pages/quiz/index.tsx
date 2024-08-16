import { useFieldArray, useForm } from "react-hook-form";
import QuizSideBar from "./components/sidebar";
import { QuizContainer, QuizDock } from "./styles";
import { dimensionModel } from "./quiz.interface";
import FormGroup from "../defaulForm/components/Group";
import { NavLink } from "react-router-dom";

const QuizScreen = () => {
  const formMethods = useForm<dimensionModel>({
    defaultValues: localStorage.getItem("questionario1")
      ? JSON.parse(localStorage.getItem("questionario1") as string)
      : {},
  });

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
          <NavLink
            style={{
              textDecoration: "none",
              color: "black",
              padding: "10px 12px",
              display: "block",
              fontFamily: "'Poppins', sans-serif",
            }}
            to={"/questinoario"}
          >
            Ver formulário
          </NavLink>
          <button type="button" className="save-button" onClick={onSubmit}>
            Salvar Questionário
          </button>
        </QuizDock>
      </section>
    </QuizContainer>
  );
};

export default QuizScreen;
