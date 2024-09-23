import { useMemo } from "react";
import { reportItemProps } from "../..";
import { answersProps, questionInput } from "../../../../models/quiz.interface";
import { ReportRangeContainer } from "./styles";

const ReportRange = ({ answers, questions, data }: reportItemProps) => {
  const markedAnswerDistance = useMemo(() => {
    const markedAnswer = questions.filter((f) => f?._id === data?._id)[0]
      .answers?.[0];

    const findIndex = answers.findIndex((e) => e._id === markedAnswer?._id);

    return (findIndex * 100) / answers.length;
  }, [answers, questions, data]);

  console.log({ markedAnswerDistance });

  return (
    <ReportRangeContainer $distance={markedAnswerDistance}>
      <ul>
        {answers?.map((answer) => {
          const findMarkedAnswer = (questions as questionInput[]).filter(
            (filter) => filter?._id === data?._id
          );

          const hasMarked = () => {
            let hasMarked = false;

            if (!findMarkedAnswer.length) return false;

            for (
              let i = 0;
              i < (findMarkedAnswer[0].answers as answersProps[])?.length;
              i++
            ) {
              if (answer._id === findMarkedAnswer[0].answers?.[i]._id) {
                hasMarked = true;
              }
            }
            return hasMarked;
          };

          return (
            <li
              className={
                (hasMarked() && !answer.correct_answer ? "wrong-answer" : "") +
                (answer.correct_answer ? "right-answer" : "")
              }
            >
              <span>{answer.weight?.toFixed(2)}</span>

              {hasMarked() ? <span className="marked-answer" /> : ""}
            </li>
          );
        })}
      </ul>
    </ReportRangeContainer>
  );
};

export default ReportRange;
