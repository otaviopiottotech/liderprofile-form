import styled from "styled-components";
import { QuestionarioContainer } from "../../styles";

export const QuizTrackContainer = styled(QuestionarioContainer)`
  padding: 1em;
  border-top: solid 1px ${({ theme }) => theme.colors.grayscale.gray_20};
  border-radius: 0px;

  .track-header {
    h3 {
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.large_bold};
      font-weight: 600;
      margin-bottom: 10px;
    }

    p {
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.extra_small};
    }
  }
`;
