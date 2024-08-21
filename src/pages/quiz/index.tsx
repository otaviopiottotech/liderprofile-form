import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import QuizSideBar from "./components/sidebar";
import { QuizContainer, QuizDock } from "./styles";
import { dimensionModel } from "./quiz.interface";
import FormGroup from "../defaulForm/components/Group";
import { NavLink } from "react-router-dom";
import { getRandomColor } from "../../utils/randomColor";

const QuizScreen = () => {
  // const formMethods = useForm<dimensionModel>({
  //   defaultValues: localStorage.getItem("questionario1")
  //     ? JSON.parse(localStorage.getItem("questionario1") as string)
  //     : {},
  // });

  const formMethods = useForm<teste>({
    defaultValues: localStorage.getItem("questionario1")
      ? JSON.parse(localStorage.getItem("questionario1") as string)
      : {
          title: "Novo Questionário",
          dimentions: [
            {
              _id: window.crypto.randomUUID(),
              title: "Grupo 1",
              color: getRandomColor(),
            },
          ],
        },
  });

  const fieldMethod = useFieldArray({
    name: "dimentions",
    control: formMethods.control,
  });

  const onSubmit = formMethods.handleSubmit((data) => {
    console.log(data);

    localStorage.setItem("questionario1", JSON.stringify(data));
  });

  const handleAddNewDimension = () => {
    const _id = window.crypto.randomUUID();
    fieldMethod.append({
      _id,
      color: getRandomColor(),
      title: "Grupo " + (fieldMethod.fields.length + 1),
    });
  };

  return (
    <QuizContainer>
      <QuizSideBar formMethods={formMethods} fieldsArray={fieldMethod} />
      <section className="quiz-form-content">
        <Test formMethods={formMethods} fieldMethod={fieldMethod} />
        <QuizDock>
          <button type="button" onClick={handleAddNewDimension}>
            teste
          </button>
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

export interface teste {
  title: string;
  dimentions: dimensionModel[];
}

interface testeC {
  formMethods: UseFormReturn<teste>;
  fieldMethod: UseFieldArrayReturn<teste, "dimentions", "id">;
}

const Test = ({ formMethods, fieldMethod }: testeC) => {
  const { fields, remove } = fieldMethod;
  const { watch } = formMethods;

  return (
    <section className="dimensionsList">
      <div className="header">
        <h1>{watch("title")}</h1>
      </div>

      <FormProvider {...formMethods}>
        {fields.map((e, i) => (
          <FormGroup
            key={e._id}
            removeQuestion={() => remove(i)}
            child_key={`dimentions.${i}`}
          />
        ))}
      </FormProvider>
    </section>
  );
};

export default QuizScreen;
