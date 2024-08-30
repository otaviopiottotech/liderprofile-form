import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import QuizSideBar from "./components/sidebar";
import { QuizContainer, QuizDock } from "./styles";
import { answersProps, dimensionModel } from "./quiz.interface";
import FormGroup from "../defaulForm/components/Group";
import { getRandomColor } from "../../utils/randomColor";
import { FaPlus } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonComponent from "../../components/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const validateAnswerBy = (answers: answersProps[]) => {
  const findCorrectAnswer = answers.filter((e) => e.correct_answer);

  return !!findCorrectAnswer.length;
};

const createQuizValidation = yup.object().shape({
  dimentions: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("O título é obrigatório"),
        questions: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().required("O título é obrigatório"),
              answers: yup
                .array()
                .of(
                  yup.object().shape({
                    title: yup
                      .string()
                      .required("O título da resposta é obrigatório"),
                  })
                )
                .test({
                  name: "oneMustBeCorrect",
                  test: (arr: any) => validateAnswerBy(arr),
                  message: "Marque pelo menos uma questão como correta",
                  exclusive: false,
                }),
            })
          )
          .min(1, "Adicione ao menos uma pergunta"),
      })
    )
    .min(1),
});

const QuizScreen = () => {
  const formMethods = useForm<QuizModel>({
    defaultValues: {
      title: "Novo Questionário",
      dimentions: [
        {
          _id: window.crypto.randomUUID(),
          title: "Tópico 1",
          color: getRandomColor(),
        },
      ],
    },
    resolver: yupResolver(createQuizValidation) as any,
  });

  const fieldMethod = useFieldArray({
    name: "dimentions",
    control: formMethods.control,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const href = window.location.search;
    const params = new URLSearchParams(href);
    const quizID = params.get("id");
    if (quizID) {
      const getQuizList = localStorage.getItem("liderprofile-quiz/list");

      if (getQuizList) {
        const quizFilter = (JSON.parse(getQuizList) as QuizModel[]).filter(
          (e) => e.id === quizID
        );

        if (quizFilter.length) {
          formMethods.setValue("id", quizFilter[0].id);
          formMethods.setValue("dimentions", quizFilter[0].dimentions);
          formMethods.setValue("title", quizFilter[0].title);
        }
      }
    }
  }, []);

  const onSubmit = formMethods.handleSubmit((data) => {
    let liderProfileQuizList = localStorage.getItem("liderprofile-quiz/list");

    if (!liderProfileQuizList) {
      liderProfileQuizList = JSON.stringify([]);
    }

    const quizData = {
      ...data,
      id: window.crypto.randomUUID(),
    };

    localStorage.setItem(
      "liderprofile-quiz/list",
      JSON.stringify([...JSON.parse(liderProfileQuizList), quizData])
    );
    toast.success("Questionário salvo com sucesso");
    navigate("/");
  });

  const handleAddNewDimension = () => {
    const _id = window.crypto.randomUUID();
    fieldMethod.append({
      _id,
      color: getRandomColor(),
      title: "Tópico " + (fieldMethod.fields.length + 1),
    });
  };

  return (
    <QuizContainer>
      <QuizSideBar formMethods={formMethods} fieldsArray={fieldMethod} />
      <section className="quiz-form-content">
        <Dimension formMethods={formMethods} fieldMethod={fieldMethod} />
        <QuizDock>
          <NavLink
            style={{
              textDecoration: "none",
              color: "black",
              padding: "10px 12px",
              display: "block",
              fontFamily: "'Poppins', sans-serif",
            }}
            to={"/"}
          >
            Voltar
          </NavLink>
          <ButtonComponent
            style={{ justifySelf: "center" }}
            buttonStyles="text"
            onClick={handleAddNewDimension}
          >
            <FaPlus /> Adicionar Tópico
          </ButtonComponent>

          <ButtonComponent
            style={{ justifySelf: "flex-end" }}
            onClick={onSubmit}
            buttonStyles="confirm"
            disabled={!fieldMethod?.fields?.length}
          >
            Salvar Questionário
          </ButtonComponent>
        </QuizDock>
      </section>
    </QuizContainer>
  );
};

export interface QuizModel {
  title: string;
  id: string;
  dimentions: dimensionModel[];
}

interface testeC {
  formMethods: UseFormReturn<QuizModel>;
  fieldMethod: UseFieldArrayReturn<QuizModel, "dimentions", "id">;
}

const Dimension = ({ formMethods, fieldMethod }: testeC) => {
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
