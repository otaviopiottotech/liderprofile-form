import { useEffect, useState } from "react";
import { HomeContainer, QuizButtonContainer } from "./styles";
import { QuizModel } from "../quiz";
import { NavLink } from "react-router-dom";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ButtonComponent from "../../components/button";
import { IoShareSocialOutline } from "react-icons/io5";
import { toast } from "sonner";

const HomeScreen = () => {
  const [quizes, setQuizes] = useState<QuizModel[]>([]);

  useEffect(() => {
    const liderProfileQuizList = localStorage.getItem("liderprofile-quiz/list");
    let oldQuiz = localStorage.getItem("questionario1");

    if (liderProfileQuizList) {
      if (oldQuiz) {
        localStorage.setItem(
          "liderprofile-quiz/list",
          JSON.stringify([
            ...JSON.parse(liderProfileQuizList),
            JSON.parse(oldQuiz),
          ])
        );

        setQuizes([...JSON.parse(liderProfileQuizList), JSON.parse(oldQuiz)]);

        localStorage.removeItem("questionario1");
      } else {
        setQuizes(JSON.parse(liderProfileQuizList));
      }
    }
  }, []);

  const handleCopy = () => {
    const liderProfileQuizList =
      localStorage.getItem("liderprofile-quiz/list") || "";
    navigator.clipboard.writeText(liderProfileQuizList as string);

    toast.success("Questionários copiados para a área de transferência");
  };

  return (
    <HomeContainer>
      <section className="quizes-section">
        <div className="section-header">
          <h3>Questionários</h3>

          <NavLink className="create-quiz-button" to={"/criar-questionario"}>
            <AiOutlinePlus /> Criar Questionário
          </NavLink>

          <ButtonComponent buttonStyles="text" onClick={handleCopy}>
            <IoShareSocialOutline />
          </ButtonComponent>
        </div>

        <ul>
          {quizes.length > 0 ? (
            quizes.map((e, i) => (
              <li key={i}>
                <QuizButton data={e} onRemove={setQuizes} />
              </li>
            ))
          ) : (
            <p className="not-found">Nenhum questionário encontrado</p>
          )}
        </ul>
      </section>
    </HomeContainer>
  );
};

interface props {
  data: QuizModel;
  onRemove(data: QuizModel[]): void;
}

const QuizButton = ({ data, onRemove }: props) => {
  const deleteQuiz = () => {
    const liderProfileQuizList: QuizModel[] = JSON.parse(
      localStorage.getItem("liderprofile-quiz/list") as string
    );

    const removeItemFromStorage = liderProfileQuizList.filter(
      (e) => e.id !== data.id
    );

    onRemove(removeItemFromStorage);
    localStorage.setItem(
      "liderprofile-quiz/list",
      JSON.stringify(removeItemFromStorage)
    );
  };

  return (
    <QuizButtonContainer>
      <div className="top-side">
        <h4>{data.title}</h4>

        <ButtonComponent
          buttonStyles="delete"
          buttonStylesType="outline"
          onClick={deleteQuiz}
        >
          <AiOutlineDelete />
        </ButtonComponent>
      </div>

      <div className="buttons-container">
        <NavLink to={`/questinoario?id=${data.id}`}>Ver formulário</NavLink>
        <NavLink to={`/criar-questionario?id=${data.id}`}>
          Editar questionário
        </NavLink>
      </div>
    </QuizButtonContainer>
  );
};

export default HomeScreen;
