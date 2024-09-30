import { cloneElement, useState } from "react";
import { QuestionarioContainer } from "./styles";
import { useForm } from "react-hook-form";
import { answersProps, dimensionModel } from "../../models/quiz.interface";
import { NavLink } from "react-router-dom";
import { QuizModel } from "../quiz";
import Modal, { ModalTitle } from "../../components/modal";
import ButtonComponent from "../../components/button";
import { decryptWithCTR } from "../../utils/decrypt";
import { useFetch } from "../../service/hooks/getQuery";
import { useMutationQuery } from "../../service/hooks/useMutationQuery";
import { toast } from "sonner";
import { encryptWithCTR } from "../../utils/encript";
import { handleFindGrade } from "./gradeFunctions";
import { QuizComponentsList } from "./components/quizComponents";

interface quizInputs {
  dimentions: {
    calc: string;
    title: string;
    questions: {
      code: string;
      answers: answersProps[];
    }[];
  }[];
}

const Ques = () => {
  const [open, setOpen] = useState(false);
  const [foudQ, setFoundQ] = useState<QuizModel>();
  const [answerData, setAnswerData] = useState<QuizModel>();

  const { handleSubmit, setValue } = useForm<quizInputs>();

  const href = window.location.search;
  const params = new URLSearchParams(href);
  const quizID = params.get("id");

  useFetch<QuizModel[]>(`/quiz/${quizID}`, [quizID], {
    onSuccess: async (data) => {
      if (data?.length) {
        const [{ encrypted_data }] = data;

        const dimentions = await decryptWithCTR(encrypted_data);

        (JSON.parse(dimentions) as QuizModel["dimentions"]).forEach((e, i) => {
          setValue(`dimentions.${i}`, e as any);
        });

        setFoundQ({
          ...data[0],
          dimentions: JSON.parse(dimentions),
        });
      }
    },
    enabled: !!quizID,
  });

  const { mutate: onSaveAnswer } = useMutationQuery("answer");

  const onSubmit = handleSubmit(async (data) => {
    const { group } = handleFindGrade(data?.dimentions as dimensionModel[]);

    const responseData = {
      dimentions: group,
      originalDimentions: foudQ?.dimentions,
    };

    const encrypted_data = await encryptWithCTR(JSON.stringify(responseData));

    const quizData = {
      title: foudQ?.title,
      description: "",
      type: "",
      encrypted_data,
    };

    onSaveAnswer(quizData, {
      onSuccess: ({ data: res }) => {
        toast.success("Questionário respondido com sucesso");
        setAnswerData(res);
        setOpen(true);
      },
      onError: (err) => {
        console.log(err);
        toast.error("Ocorreu um erro");
      },
    });
  });

  const handleUpdateQuestion = (
    key: string,
    code: string,
    answers: answersProps[]
  ) => {
    const markedAnswers = answers.map((e) => ({ ...e, marked: true }));

    setValue(`${key}.code` as any, code);
    setValue(`${key}.answers` as any, markedAnswers);
  };

  return (
    <>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <div style={{ padding: "2em" }}>
          <ModalTitle>Formulário enviado com sucesso</ModalTitle>
          <NavLink
            style={{
              textDecoration: "none",
              color: "black",
              padding: "10px 12px",
              display: "block",
              fontFamily: "'Poppins', sans-serif",
            }}
            to={`/relatorio?id=${answerData?.id}`}
          >
            Ver Relatório
          </NavLink>
        </div>
      </Modal>
      <QuestionarioContainer>
        <section className="header-container">
          <div className="header">
            <h1>{foudQ?.title}</h1>

            <p>{foudQ?.description}</p>
          </div>
        </section>

        <form onSubmit={onSubmit}>
          {foudQ &&
            foudQ?.dimentions?.length > 0 &&
            foudQ?.dimentions?.map((dimension, dimensionIndex) => {
              return (
                <section key={dimensionIndex} className="group-section">
                  <div className="group-header-container">
                    <h4>{dimension.title}</h4>
                    <p>{dimension?.description}</p>
                  </div>

                  {dimension.questions?.map((e, i) => {
                    const child_key = `dimentions.${dimensionIndex}.questions.${i}`;
                    return (
                      <section key={e.code} className="question-container">
                        {cloneElement(QuizComponentsList[e.type], {
                          title: e?.title,
                          answers: e?.answers,
                          data: e,
                          child_key,
                          onChangeAnswer: (
                            answers: answersProps[],
                            code: string,
                            key: string
                          ) =>
                            handleUpdateQuestion(
                              key || child_key,
                              code || e.code,
                              answers
                            ),
                        })}
                      </section>
                    );
                  })}
                </section>
              );
            })}

          <div className="buttons-section">
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
            <ButtonComponent buttonStyles="confirm" type="submit">
              Enviar
            </ButtonComponent>
          </div>
        </form>
      </QuestionarioContainer>
    </>
  );
};

export default Ques;
