import { cloneElement, useMemo, useState } from "react";
import { ReportContainer } from "./styles";
import {
  answersProps,
  dimensionModel,
  questionInput,
  rulesModel,
} from "../../models/quiz.interface";
import LiderProfileLogo from "../../assets/liderprofile_logo.jpg";
import { format } from "date-fns";
import ReportRange from "./components/range";
import ReportDefaultItem from "./components/defaultItem";
import { useFetch } from "../../service/hooks/getQuery";
import { decryptWithCTR } from "../../utils/decrypt";
import { reportElements } from "./reportElements";

interface reportType {
  title: string;
  created_at: Date;
  dimentions: dimensionModel[];
  encrypted_data: string;
  rules?: rulesModel[];
  originalDimentions: dimensionModel[];
}

export interface reportItemProps {
  answers: answersProps[];
  questions: questionInput[];
  data: questionInput | dimensionModel | undefined;
}

const ReportScreen = () => {
  const [findQuiz, setFindQuiz] = useState<reportType>();

  const href = window.location.search;
  const params = new URLSearchParams(href);
  const quizID = params.get("id");

  useFetch<reportType[]>(`/answer/${quizID}`, [quizID, "answer"], {
    onSuccess: async (data) => {
      if (data?.length) {
        const [{ encrypted_data }] = data;
        const dimentions = await decryptWithCTR(encrypted_data);

        setFindQuiz({
          ...data[0],
          ...JSON.parse(dimentions),
        });

        console.log(
          {
            ...data[0],
            ...JSON.parse(dimentions),
          },
          "aaaa"
        );
      }
    },
    enabled: !!quizID,
  });

  const quizGeralGrade = useMemo(() => {
    const questionsTotal =
      findQuiz?.dimentions.reduce((a, b) => a + Number(b.grade), 0) || 0;

    const dimentionsTotal = findQuiz?.dimentions?.length || 1;

    return (questionsTotal / dimentionsTotal).toFixed(2);
  }, [findQuiz]);

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
        <div className="left-side">
          <h2>Relatório</h2>
          <h1>{findQuiz?.title}</h1>

          {findQuiz?.rules?.map((grade, gradeIndex) => (
            <div className="grade-item" key={gradeIndex}>
              <span>Sobre a sua nota:</span>
              <p>{grade.message}</p>
            </div>
          ))}
        </div>

        <div className="right-side">
          <span>Nota</span>
          <h1>{quizGeralGrade}</h1>
        </div>
      </div>

      <main className="content">
        {findQuiz?.dimentions.map((e, i) => {
          const findRuleForUserGrade = e.rules?.filter((filter) => {
            const func = filter.compare.replaceAll("N", e?.grade + "");

            return eval(func);
          });

          const findOriginalQuestions = findQuiz.originalDimentions.filter(
            (f) => f._id === e._id
          );

          return (
            <section key={i} className="topic-section">
              <div className="section-header">
                <div className="left-side">
                  <span className="topic-subtitle">Tópico</span>
                  <h2>{e.title}</h2>
                </div>

                <div className="right-side">
                  <h3>Sua nota</h3>
                  <h1>{e?.grade?.toFixed(2)}</h1>
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
                        const questionElement = (reportElements as any)?.[
                          q?.type
                        ];

                        return (
                          <div key={q._id} className="question">
                            <div className="question-header">
                              <h3>{q.title}</h3>
                            </div>

                            {questionElement ? (
                              cloneElement(questionElement, {
                                answers: q.answers,
                                data: q,
                                questions: e.questions,
                              })
                            ) : (
                              <ReportDefaultItem
                                answers={q.answers as answersProps[]}
                                data={q}
                                questions={e.questions as questionInput[]}
                              />
                            )}
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
          <p>
            Realizado em:{" "}
            {findQuiz?.created_at &&
              format(findQuiz?.created_at as Date, "dd/MM/yyyy")}
          </p>
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
