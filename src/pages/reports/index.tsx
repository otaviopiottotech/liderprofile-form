import { useMemo } from "react";
import { ReportContainer } from "./styles";
import {
  answersProps,
  dimensionModel,
  questionInput,
} from "../quiz/quiz.interface";
import LiderProfileLogo from "../../assets/liderprofile_logo.jpg";
import { format } from "date-fns";

interface reportType {
  title: string;
  date: Date;
  dimentions: dimensionModel[];
  originalDimentions: dimensionModel[];
}

const ReportScreen = () => {
  const findQuiz: reportType | undefined = useMemo(() => {
    const quiz = localStorage.getItem("quiz-done");

    if (quiz) {
      console.log(JSON.parse(quiz));
      return JSON.parse(quiz);
    }

    return undefined;
  }, []);

  return (
    <ReportContainer>
      <section className="hero">
        <img src={LiderProfileLogo} />

        <div className="wave-svg">
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              style={{ stroke: "none", fill: "#f15738" }}
            ></path>
          </svg>
        </div>
      </section>
      <div className="report-header">
        <h2>Relatório</h2>
        <h1>{findQuiz?.title}</h1>

        <div className="sub-header">
          <p>Realizado em: {format(findQuiz?.date as Date, "dd/MM/yyyy")}</p>
        </div>
      </div>

      <main className="content">
        {findQuiz?.dimentions.map((e, i) => {
          const findRuleForUserGrade = e.rules?.filter((filter) => {
            const func = filter.compare
              .replaceAll("100", "101")
              .replaceAll("N", e?.grade + "");

            return eval(func);
          });

          const findOriginalQuestions = findQuiz.originalDimentions.filter(
            (f) => f._id === e._id
          );

          return (
            <section key={i} className="topic-section">
              <div className="section-header">
                <div className="left-side">
                  <h3>Tópico</h3>
                  <h2>{e.title}</h2>
                </div>

                <div className="right-side">
                  <h3>Sua nota</h3>
                  <h1>{e?.grade}</h1>
                </div>
              </div>

              <div className="about-user-grade">
                {findRuleForUserGrade?.map((grade, gradeIndex) => (
                  <div className="grade-item" key={gradeIndex}>
                    <span>Sobre a sua nota:</span>
                    <p>{grade.message}</p>
                  </div>
                ))}
              </div>

              <section className="questions">
                <div className="questions-section-header">
                  <p>Questões</p>
                </div>

                {findOriginalQuestions.map((item) => {
                  return (
                    <div key={item._id}>
                      {(item.questions as questionInput[]).map((q) => {
                        return (
                          <div key={q._id} className="question">
                            <div className="question-header">
                              <h3>{q.title}</h3>
                            </div>

                            <ul>
                              {q.answers?.map((answer) => {
                                const findMarkedAnswer = (
                                  e.questions as questionInput[]
                                ).filter((filter) => filter?._id === q?._id);

                                const hasMarked = () => {
                                  let hasMarked = false;

                                  if (!findMarkedAnswer.length) return false;

                                  for (
                                    let i = 0;
                                    i <
                                    (
                                      findMarkedAnswer[0]
                                        .answers as answersProps[]
                                    )?.length;
                                    i++
                                  ) {
                                    if (
                                      answer._id ===
                                      findMarkedAnswer[0].answers?.[i]._id
                                    ) {
                                      hasMarked = true;
                                    }
                                  }
                                  return hasMarked;
                                };

                                return (
                                  <li
                                    className={
                                      (hasMarked() && !answer.correct_answer
                                        ? "wrong-answer"
                                        : "") +
                                      (answer.correct_answer
                                        ? "right-answer"
                                        : "")
                                    }
                                  >
                                    <span>{answer.title}</span>

                                    {hasMarked() ? (
                                      <span className="marked-answer">
                                        Resposta marcada
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </section>
            </section>
          );
        })}
      </main>

      <footer>
        <div className="page-indicator">
          <p>Realizado em: {format(findQuiz?.date as Date, "dd/MM/yyyy")}</p>
        </div>

        <section className="advise">
          <h1>Aviso Legal</h1>

          <p>
            O conteúdo deste relatório é provido “como é” sem qualquer garantias
            de qualquer tipo incluindo garantias de mercantibilidade, ou
            prescrição para determinado uso. <br /> <br />A informação oferecida
            aqui neste relatório é com fins de direcionamento e não é uma
            avaliação do desempenho atual. <br /> <br />É recomendada a
            orientação de um consultor treinado e certificado no LIDER referente
            ao uso das informações neste relatório.
            <br /> <br /> Apesar do “Lider Profile” fazer esforços efetivos para
            manter a validade e precisão do conteúdo deste relatório, não assume
            qualquer responsabilidade por erros ou omissões no conteúdo deste
            relatório. <br /> <br />
            No que permitir a lei, nem a Berg Enterprise, sócios ou empregados e
            representantes serão responsáveis de qualquer forma (inclusive
            negligência) por qualquer perda, prejuízo, custo ou gasto sofrido ou
            causado por você ou solicitações contra você pelo seu uso deste
            relatório. <br /> <br />A BERG ENTERPRISE se reserva ao direito de
            atualizar e/ou modificar as informações contidas neste relatório a
            qualquer momento sem aviso prévio.
          </p>
        </section>
      </footer>
    </ReportContainer>
  );
};

export default ReportScreen;
