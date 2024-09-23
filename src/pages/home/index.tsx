import { useState } from "react";
import { HomeContainer, QuizButtonContainer } from "./styles";
import { QuizModel } from "../quiz";
import { NavLink } from "react-router-dom";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ButtonComponent from "../../components/button";
import { toast } from "sonner";
import { useFetch } from "../../service/hooks/getQuery";
import { api } from "../../service/api";

const HomeScreen = () => {
  const [quizes, setQuizes] = useState<QuizModel[]>([]);

  const { refetch } = useFetch<QuizModel[]>("/quiz", ["quiz"], {
    onSuccess: (data) => {
      setQuizes(data);
    },
  });

  return (
    <HomeContainer>
      <section className="quizes-section">
        <div className="section-header">
          <h3>Questionários</h3>

          <NavLink className="create-quiz-button" to={"/criar-questionario"}>
            <AiOutlinePlus /> Criar Questionário
          </NavLink>
        </div>

        <ul>
          {quizes.length > 0 ? (
            quizes.map((e, i) => (
              <li key={i}>
                <QuizButton data={e} onRemove={refetch} />
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
  onRemove(): void;
}

const QuizButton = ({ data, onRemove }: props) => {
  const deleteQuiz = async () => {
    try {
      await api.delete(`/quiz/${data.id}`);
      onRemove();
      toast.success("Formulário deletado com sucesso");
    } catch (error) {
      toast.success("erro ao deletar formulário");
    }
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
