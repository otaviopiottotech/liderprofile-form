import { cloneElement } from "react";
import { answersProps } from "../../../../models/quiz.interface";
import { QuizTrackContainer } from "./styles";
import { quizMultiSelectProps } from "../multiSelect";
import { QuizComponentsList } from "../quizComponents";

const QuizTrack = ({
  data,
  onChangeAnswer,
  child_key,
}: quizMultiSelectProps) => {
  return (
    <QuizTrackContainer>
      <div className="track-header">
        <h3>{data?.title}</h3>
        <p>{data?.description}</p>
      </div>

      {data?.questions?.map((e, i) => {
        const track_child_key = `${child_key}.questions.${i}`;

        return (
          <section key={e.code} className="question-container">
            {cloneElement(QuizComponentsList[e.type], {
              title: e.title,
              answers: e.answers,
              child_key: track_child_key,

              onChangeAnswer: (answers: answersProps[]) =>
                onChangeAnswer(answers, e.code, track_child_key),
            })}
          </section>
        );
      })}
    </QuizTrackContainer>
  );
};

export default QuizTrack;
