import { useMemo } from "react";
import { QuestionarioContainer } from "./styles";
import { useForm } from "react-hook-form";
import { answersProps, questionInput } from "../quiz/quiz.interface";
import QuizSelect from "./components/select";
import QuizMultiSelect from "./components/multiSelect";
import { NavLink } from "react-router-dom";
import { teste } from "../quiz";

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

  const foudQ = useMemo<teste | undefined>(() => {
    const q = localStorage.getItem("questionario1");

    if (q) {
      const parseQuestion: teste = JSON.parse(q);

      parseQuestion.dimentions.forEach((e, i) => {
        setValue(`dimentions.${i}.title`, e.title as string);
        setValue(`dimentions.${i}.calc`, e.calc as string);
      });

      return parseQuestion;
    }
    return undefined;
  }, []);

  const onSubmit = handleSubmit((data) => {
    let grades = "";

    console.log(data);

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

      console.log({ currentDimension: currentDimension.title, finalCalc });

      grades =
        grades +
        " ;" +
        `Grupo:${currentDimension.title} e nota: ${eval(finalCalc)}`;
    }
    window.alert(grades);
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
                <h4>{dimension.title}</h4>

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
          <button>Enviar</button>
        </div>
      </form>
    </QuestionarioContainer>
  );
};

export default Ques;
