import * as yup from "yup";
import { answersProps } from "../../models/quiz.interface";

const validateAnswerBy = (answers: answersProps[]) => {
  const findCorrectAnswer = answers?.filter((e) => e?.correct_answer);

  return !!findCorrectAnswer?.length;
};

const yupDimensionValidation = yup.object().shape({
  title: yup.string().required("O título é obrigatório"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("O título é obrigatório"),
        answers: yup
          .array()
          .of(
            yup.object().shape({
              title: yup
                .string()
                .required("O título da resposta é obrigatório"),
            })
          )
          .test({
            name: "oneMustBeCorrect",
            test: (arr: any) => validateAnswerBy(arr),
            message: "Marque pelo menos uma questão como correta",
            exclusive: false,
          }),
      })
    )
    .min(1, "Adicione ao menos uma pergunta"),
});

export const createQuizValidation = yup.object().shape({
  dimentions: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("O título é obrigatório"),
        questions: yup
          .array()
          .of(
            yup.object().when(([obj], schema) => {
              if (obj?.type === "track") {
                return yupDimensionValidation;
              }

              return schema.shape({
                title: yup.string().required("O título é obrigatório"),
                answers: yup
                  .array()
                  .of(
                    yup.object().shape({
                      title: yup
                        .string()
                        .required("O título da resposta é obrigatório"),
                    })
                  )
                  .test({
                    name: "oneMustBeCorrect",
                    test: (arr: any) => validateAnswerBy(arr),
                    message: "Marque pelo menos uma questão como correta",
                    exclusive: false,
                  }),
              });
            })
          )
          .min(1, "Adicione ao menos uma pergunta"),
      })
    )
    .min(1),
});
