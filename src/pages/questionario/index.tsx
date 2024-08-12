import { useMemo } from "react";
import { QuestionarioContainer } from "./styles";
import { useForm } from "react-hook-form";
import { answersProps, dimensionModel } from "../quiz/quiz.interface";
import QuizSelect from "./components/select";
import QuizMultiSelect from "./components/multiSelect";

interface quizInputs {
  questions: {
    code: string;
    answers: answersProps[];
  }[];
}

const Ques = () => {
  const { handleSubmit, setValue } = useForm<quizInputs>();

  const foudQ = useMemo<dimensionModel>(() => {
    const q = localStorage.getItem("questionario1");

    if (q) {
      return JSON.parse(q);
    }
    return undefined;
  }, []);

  const onSubmit = handleSubmit((data) => {
    const grade = data.questions.map((e) => {
      return {
        code: e.code,
        grade: e.answers.reduce((a, b) => {
          const value = b.correct_answer ? Number(b.weight) : 0;
          return a + value;
        }, 0),
      };
    });

    let finalCalc = foudQ.calc;

    for (let i = 0; i < foudQ.questions.length; i++) {
      const currentQ = foudQ.questions[i];

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

    window.alert(`Sua Nota: ${eval(finalCalc)}`);
  });

  const handleUpdateQuestion = (
    index: number,
    code: string,
    answers: answersProps[]
  ) => {
    setValue(`questions.${index}.code`, code);
    setValue(`questions.${index}.answers`, answers);
  };

  return (
    <QuestionarioContainer>
      <div className="header">
        <h1>{foudQ?.title}</h1>
      </div>

      <form onSubmit={onSubmit}>
        {foudQ?.questions?.length > 0 &&
          foudQ?.questions?.map((e, i) => {
            if (e.type === "select") {
              return (
                <section key={e.code} className="question-container">
                  <QuizSelect
                    title={e.title as string}
                    answers={e.answers as answersProps[]}
                    onChangeAnswer={(answers) =>
                      handleUpdateQuestion(i, e.code, answers)
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
                    handleUpdateQuestion(i, e.code, answers)
                  }
                />
              </section>
            );
          })}

        <div className="buttons-section">
          <button>Enviar</button>
        </div>
      </form>
    </QuestionarioContainer>
  );
};

export default Ques;
