import {
  answersProps,
  dimensionModel,
  questionInput,
} from "../../models/quiz.interface";

const updateDimension = (
  dimentions: dimensionModel,
  dataToUpdate: dimensionModel | questionInput
): dimensionModel => {
  return {
    ...dimentions,
    questions: dimentions.questions?.map((e) => {
      if (e._id === dataToUpdate._id) {
        return dataToUpdate;
      }
      return e;
    }) as questionInput[],
  };
};

export const handleFindGrade = (dimentions: dimensionModel[]) => {
  let group: dimensionModel[] = [];

  for (let dI = 0; dI < dimentions.length; dI++) {
    let currentDimension = dimentions[dI];

    const grade = (currentDimension.questions as questionInput[]).map((e) => {
      if (e.type === "track") {
        const { total_grade, group } = handleFindGrade([e as dimensionModel]);

        currentDimension = updateDimension(currentDimension, group?.[0]);

        console.log({ currentDimension, group });

        return {
          code: e.code,
          grade: total_grade,
        };
      }

      return {
        code: e.code,
        grade: (e?.answers as answersProps[]).reduce((a, b) => {
          const value = b.correct_answer ? Number(b.weight) : 0;
          return a + value;
        }, 0),
      };
    });

    group = handleCalculateGrade(currentDimension, group, grade);
  }

  const finalCalc =
    group.reduce((a: number, b: any) => a + Number(b.grade), 0) || 0;

  return { group, total_grade: finalCalc };
};

const handleCalculateGrade = (
  dimension: dimensionModel | questionInput,
  group: any,
  grade: any
) => {
  let finalCalc = (dimension as dimensionModel).calc as string;
  let calcGroup = group;

  for (let i = 0; i < (dimension.questions as questionInput[]).length; i++) {
    const currentQ = (dimension.questions as questionInput[])[i];
    const acertoValue = grade.filter((e: any) => e.code === currentQ.code);

    if (acertoValue.length) {
      const regex = new RegExp(`\\b${acertoValue[0].code}\\b`, "g");

      finalCalc = finalCalc.replaceAll(regex, acertoValue[0].grade + "");
    } else {
      const regex = new RegExp(`\\b${currentQ.code}\\b`, "g");
      finalCalc = finalCalc.replaceAll(regex, "0");
    }
  }

  calcGroup = [
    ...calcGroup,
    {
      ...dimension,
      grade: eval(finalCalc),
    },
  ];

  return calcGroup;
};
