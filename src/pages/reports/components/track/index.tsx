import { cloneElement, useMemo } from "react";
import { reportItemProps } from "../..";
import {
  answersProps,
  dimensionModel,
  questionInput,
} from "../../../../models/quiz.interface";
import ReportDefaultItem from "../defaultItem";
import { ReportTrackContainer } from "./styles";
import { reportElements } from "../../reportElements";

const ReportTrack = ({ data, answers, questions }: reportItemProps) => {
  const trackData = useMemo(() => {
    console.log({ data, questions });

    const findTrackData = questions.find((e) => e._id === data?._id);

    if (findTrackData) return findTrackData;
    return data;
  }, [data, questions]);

  return (
    <ReportTrackContainer>
      <section className="track-section">
        <div className="section-header">
          <div className="left-side">
            <h3>Traço</h3>
            <h2>{data?.title}</h2>
          </div>

          <div className="right-side">
            <h3>Sua nota</h3>
            <h1>{trackData?.grade?.toFixed(2)}</h1>
          </div>
        </div>

        <div className="about-user-grade">
          {(data as dimensionModel).rules?.map((grade, gradeIndex) => (
            <div className="grade-item" key={gradeIndex}>
              <span>Sobre a sua nota:</span>
              <p>{grade?.message}</p>
            </div>
          ))}
        </div>

        <section className="questions">
          <div className="questions-section-header">
            <p>Questões</p>
          </div>

          {(data?.questions as questionInput[]).map((q) => {
            const questionElement = (reportElements as any)?.[q?.type];

            return (
              <div key={q._id} className="question">
                <div className="question-header">
                  <h3>{q.title}</h3>
                </div>

                {questionElement ? (
                  cloneElement(questionElement, {
                    answers: q.answers,
                    data: q,
                    questions: trackData?.questions,
                  })
                ) : (
                  <ReportDefaultItem
                    answers={q.answers as answersProps[]}
                    data={q}
                    questions={trackData?.questions as questionInput[]}
                  />
                )}
              </div>
            );
          })}
        </section>
      </section>
    </ReportTrackContainer>
  );
};

export default ReportTrack;
