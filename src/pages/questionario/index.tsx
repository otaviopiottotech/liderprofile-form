import { useMemo } from "react";
import { QuestionarioContainer } from "./styles";
import { useForm } from "react-hook-form";
import { answersProps, dimensionModel } from "../quiz/quiz.interface";

const Ques = () => {
  const { register, handleSubmit } = useForm();

  const foudQ = useMemo<dimensionModel>(() => {
    const q = localStorage.getItem("questionario1");

    if (q) {
      return JSON.parse(q);
    }
    return undefined;
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data, foudQ);

    const expectedAnswer = foudQ.questions
      .map((e) =>
        Object.assign(
          {},
          ...(e.answers as answersProps[]).map((a) => ({ ...e, ...a }))
        )
      )
      .filter((f) => f.correct_answer);

    console.log({ expectedAnswer });

    let acertos: any[] = [];

    for (const keys in data) {
      const achaAcerto = expectedAnswer.filter((e) => e.title === data[keys]);

      if (achaAcerto.length) {
        acertos = [...acertos, achaAcerto[0]];
      }
    }

    let finalCalc = foudQ.calc;

    for (let i = 0; i < foudQ.questions.length; i++) {
      const currentQ = foudQ.questions[i];

      const acertoValue = acertos.filter((e) => e.code === currentQ.code);

      if (acertoValue.length) {
        finalCalc = finalCalc.replaceAll(
          acertoValue[0].code,
          acertoValue[0].max_value
        );
      } else {
        finalCalc = finalCalc.replaceAll(currentQ.code, "0");
      }
    }

    console.log(finalCalc);

    window.alert(`Sua Nota: ${eval(finalCalc)}`);
  });

  return (
    <QuestionarioContainer>
      <div className="header">
        <h1>{foudQ?.title}</h1>
      </div>

      <form onSubmit={onSubmit}>
        {foudQ?.questions?.length > 0 &&
          foudQ?.questions?.map((e, i) => (
            <div key={e.code} className="question-container">
              <label htmlFor={e.code}>{e.title}</label>
              <select id={e.code} {...register(e.code)}>
                {e.answers?.map((a, ai) => (
                  <option key={ai}>{a.title}</option>
                ))}
              </select>
            </div>
          ))}

        <button>Enviar</button>
      </form>
    </QuestionarioContainer>
  );
};

export default Ques;
