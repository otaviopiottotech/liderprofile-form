import { useMemo, useState } from "react";
import { QuestionarioContainer } from "./styles";
import { useForm } from "react-hook-form";
import { answersProps, questionInput } from "../quiz/quiz.interface";
import QuizSelect from "./components/select";
import QuizMultiSelect from "./components/multiSelect";
import { NavLink } from "react-router-dom";
import { QuizModel } from "../quiz";
import Modal, { ModalTitle } from "../../components/modal";
import ButtonComponent from "../../components/button";
import QuizRange from "./components/Range";

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
  const { handleSubmit, setValue } = useForm<quizInputs>();

  const foudQ = useMemo<QuizModel | undefined>(() => {
    const href = window.location.search;
    const params = new URLSearchParams(href);
    const quizID = params.get("id");

    const getQuizList = localStorage.getItem("liderprofile-quiz/list");

    if (getQuizList) {
      const quizFilter = (JSON.parse(getQuizList) as QuizModel[]).filter(
        (e) => e.id === quizID
      );

      if (quizFilter.length) {
        const currentQuiz = quizFilter[0];

        currentQuiz.dimentions.forEach((e, i) => {
          setValue(`dimentions.${i}`, e as any);
        });

        return currentQuiz;
      }
    }

    return undefined;
  }, []);

  const onSubmit = handleSubmit((data) => {
    let group: any = [];

    for (let dI = 0; dI < data.dimentions.length; dI++) {
      const currentDimension = data.dimentions[dI];

      const grade = (currentDimension.questions as questionInput[]).map((e) => {
        return {
          code: e.code,
          grade: (e?.answers as answersProps[]).reduce((a, b) => {
            const value = b.correct_answer ? Number(b.weight) : 0;
            return a + value;
          }, 0),
        };
      });

      let finalCalc = currentDimension.calc as string;

      for (
        let i = 0;
        i < (currentDimension.questions as questionInput[]).length;
        i++
      ) {
        const currentQ = (currentDimension.questions as questionInput[])[i];

        const acertoValue = grade.filter((e) => e.code === currentQ.code);

        if (acertoValue.length) {
          finalCalc = finalCalc.replaceAll(
            acertoValue[0].code,
            acertoValue[0].grade + ""
          );
        } else {
          finalCalc = finalCalc.replaceAll(currentQ.code, "0");
        }
      }

      group = [
        ...group,
        {
          ...currentDimension,
          grade: eval(finalCalc),
        },
      ];
    }

    const quizData = {
      ...foudQ,
      date: new Date(),
      dimentions: group,
      originalDimentions: foudQ?.dimentions,
    };

    console.log(quizData);
    localStorage.setItem("quiz-done", JSON.stringify(quizData));
  });

  const handleUpdateQuestion = (
    index: number,
    dimensionIndex: number,
    code: string,
    answers: answersProps[]
  ) => {
    setValue(`dimentions.${dimensionIndex}.questions.${index}.code`, code);
    setValue(
      `dimentions.${dimensionIndex}.questions.${index}.answers`,
      answers
    );
  };

  return (
    <QuestionarioContainer>
      <div className="header">
        <h1>{foudQ?.title}</h1>
      </div>

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
                  if (e.type === "select") {
                    return (
                      <section key={e.code} className="question-container">
                        <QuizSelect
                          title={e.title as string}
                          answers={e.answers as answersProps[]}
                          onChangeAnswer={(answers) =>
                            handleUpdateQuestion(
                              i,
                              dimensionIndex,
                              e.code,
                              answers
                            )
                          }
                        />
                      </section>
                    );
                  }
                  if (e.type === "range") {
                    return (
                      <section key={e.code} className="question-container">
                        <QuizRange
                          title={e.title as string}
                          answers={e.answers as answersProps[]}
                          onChangeAnswer={(answers) =>
                            handleUpdateQuestion(
                              i,
                              dimensionIndex,
                              e.code,
                              answers
                            )
                          }
                        />
                      </section>
                    );
                  }

                  return (
                    <section key={e.code} className="question-container">
                      <QuizMultiSelect
                        title={e.title as string}
                        answers={e.answers as answersProps[]}
                        key={e.code}
                        onChangeAnswer={(answers) =>
                          handleUpdateQuestion(
                            i,
                            dimensionIndex,
                            e.code,
                            answers
                          )
                        }
                      />
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
          <SendQuizButton onSend={onSubmit} />
        </div>
      </form>
    </QuestionarioContainer>
  );
};

interface SendButtonQuizProps {
  onSend(): void;
}

const SendQuizButton = ({ onSend }: SendButtonQuizProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    onSend();
    setOpen(true);
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
            to={"/relatorio"}
          >
            Ver Relatório
          </NavLink>
        </div>
      </Modal>
      <ButtonComponent buttonStyles="confirm" onClick={handleClick}>
        Enviar
      </ButtonComponent>
    </>
  );
};

export default Ques;
