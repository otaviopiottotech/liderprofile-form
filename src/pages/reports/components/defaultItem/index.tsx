import { reportItemProps } from "../..";
import { answersProps, questionInput } from "../../../../models/quiz.interface";

const ReportDefaultItem = ({ answers, questions, data }: reportItemProps) => {
  return (
    <ul className="default-list">
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
            <span>{answer.title}</span>

            {hasMarked() ? (
              <span className="marked-answer">Resposta marcada</span>
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ReportDefaultItem;
