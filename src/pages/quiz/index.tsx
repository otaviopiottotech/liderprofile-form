import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import QuizSideBar from "./components/sidebar";
import { QuizContainer } from "./styles";
import {
  dimensionModel,
  questionsType,
  rulesModel,
} from "../../models/quiz.interface";
import FormGroup from "../defaulForm/components/Group";
import { getRandomColor } from "../../utils/randomColor";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { encryptWithCTR } from "../../utils/encript";
import { useFetch } from "../../service/hooks/getQuery";
import { decryptWithCTR } from "../../utils/decrypt";
import { useMutationQuery } from "../../service/hooks/useMutationQuery";
import { createQuizValidation } from "./validation";
import QuizHeader from "./components/quizHeader";
import { elementsOptions } from "./components/elementsSelection";
import { EmptyQuizContainer } from "../defaulForm/components/Group/styles";

export function getValueFromPath(obj: any, path: string) {
  const pathArray = path.split(".");

  return pathArray.reduce((acc, key) => {
    if (!acc) return undefined;

    const index = parseInt(key, 10);
    return !isNaN(index) ? acc[index] : acc[key];
  }, obj);
}

const QuizScreen = () => {
  const href = window.location.search;
  const params = new URLSearchParams(href);
  const quizID = params.get("id");

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

  useFetch<QuizModel[]>(`/quiz/${quizID}`, [quizID], {
    onSuccess: async (data) => {
      if (data?.length) {
        const [{ id, title, encrypted_data }] = data;

        const dimentions = await decryptWithCTR(encrypted_data);

        formMethods.setValue("id", id);
        formMethods.setValue("dimentions", JSON.parse(dimentions));
        formMethods.setValue("title", title);
      }
    },
    enabled: !!quizID,
  });

  const { mutate: onSaveQuiz } = useMutationQuery(
    `/quiz`,
    quizID ? "put" : "post"
  );

  const onSubmit = formMethods.handleSubmit(async (data) => {
    const dataToJSON = JSON.stringify(data.dimentions);

    console.log(data);

    return;
    const encrypted_data = await encryptWithCTR(dataToJSON);

    const quizData = {
      title: data.title,
      encrypted_data,
      id: quizID,
      description: "",
    };

    onSaveQuiz(quizData, {
      onSuccess: () => {
        toast.success("Salvo com sucesso");
        toast.success("Questionário salvo com sucesso");
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Ocorreu um erro");
      },
    });
  });

  return (
    <QuizContainer>
      <QuizHeader
        fieldMethod={fieldMethod}
        formMethods={formMethods}
        onSubmit={onSubmit}
      />
      <QuizSideBar formMethods={formMethods} fieldsArray={fieldMethod} />
      <section className="quiz-form-content">
        <Dimension formMethods={formMethods} fieldMethod={fieldMethod} />
      </section>
    </QuizContainer>
  );
};

export interface QuizModel {
  title: string;
  description: string;
  id: string;
  rules?: rulesModel[];
  dimentions: dimensionModel[];
  encrypted_data: string;
}

interface testeC {
  formMethods: UseFormReturn<QuizModel>;
  fieldMethod: UseFieldArrayReturn<QuizModel, "dimentions", "id">;
}

const Dimension = ({ formMethods, fieldMethod }: testeC) => {
  const { append, fields, remove } = fieldMethod;
  const { watch } = formMethods;

  const handleAddNewQuestion = () => {
    const _id = window.crypto.randomUUID();
    let title = "Tópico " + (fields.length + 1);
    append({
      color: getRandomColor(),
      _id,
      title,
    });
  };

  return (
    <section className="dimensionsList">
      <div className="header">
        <h1>{watch("title") as any}</h1>
      </div>
      <section className="topic-list">
        <FormProvider {...formMethods}>
          {fields.length ? (
            fields.map((e, i) => (
              <FormGroup
                key={e._id}
                removeQuestion={() => remove(i)}
                child_key={`dimentions.${i}`}
              />
            ))
          ) : (
            <EmptyQuiz onSelectNewElement={handleAddNewQuestion} />
          )}
        </FormProvider>
      </section>
    </section>
  );
};

interface emptyQuizProps {
  onSelectNewElement(): void;
}

const EmptyQuiz = ({ onSelectNewElement }: emptyQuizProps) => {
  return (
    <EmptyQuizContainer>
      <div className="title">
        <p>
          Nenhum Tópico adicionado, arraste ou selecione um tópico para começar
          a editar
        </p>
      </div>

      <div className="button-list">
        {elementsOptions
          .filter((e) => e.type === "group")
          .map((e, i) => (
            <li key={i}>
              <button type="button" onClick={() => onSelectNewElement()}>
                {e.icon}
                <span>{e.title}</span>
              </button>
            </li>
          ))}
      </div>
    </EmptyQuizContainer>
  );
};

export default QuizScreen;
