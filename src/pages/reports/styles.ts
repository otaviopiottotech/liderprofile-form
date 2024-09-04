import styled from "styled-components";

export const ReportContainer = styled.main`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.brand.white};

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 -1em;
    padding-top: 10em;

    img {
      max-width: 800px;
    }

    .wave-svg {
      width: 100%;
      height: 300px;
      display: flex;
      align-items: flex-end;
      overflow: hidden;
    }

    svg {
      rotate: 180deg;
    }
  }

  .report-header {
    margin-bottom: 3em;
    margin: 0 -1em;
    padding: 2em 3em 5em 3em;
    background-color: ${({ theme }) => theme.colors.brand.orange};

    h2 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.large};
    }

    h1 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.h1};
      font-weight: 600;
    }

    .sub-header {
      p {
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.extra_small};
      }
    }
  }

  .content {
    margin-top: 5em;

    .topic-section {
      padding: 3em 2em;
      & + .topic-section {
        border-top: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
      }

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          color: ${({ theme }) => theme.colors.grayscale.gray_60};
          ${({ theme }) => theme.font.p.small};
        }
        h2 {
          color: ${({ theme }) => theme.colors.brand.orange};
          ${({ theme }) => theme.font.h1};
          font-weight: 600;
        }

        h1 {
          text-align: center;
          color: ${({ theme }) => theme.colors.grayscale.gray_90};
          ${({ theme }) => theme.font.h3};
          font-size: 3em;
          font-weight: 900;
        }
      }

      .about-user-grade {
        margin-top: 1em;

        .grade-item {
          span {
            color: ${({ theme }) => theme.colors.grayscale.gray_60};
            ${({ theme }) => theme.font.p.extra_small};
          }

          p {
            color: ${({ theme }) => theme.colors.grayscale.gray_90};
            ${({ theme }) => theme.font.p.normal};
          }
        }
      }

      .questions {
        margin-top: 2em;

        .questions-section-header {
          p {
            color: ${({ theme }) => theme.colors.grayscale.gray_40};
            ${({ theme }) => theme.font.p.extra_small};
          }
        }

        .question {
          padding: 1em;

          & + .question {
            border-top: 1px solid
              ${({ theme }) => theme.colors.grayscale.gray_10};
          }

          .question-header {
            h3 {
              color: ${({ theme }) => theme.colors.grayscale.gray_90};
              ${({ theme }) => theme.font.p.medium_bold};
            }
          }

          .default-list {
            padding: 0 0 0 10px;
            display: grid;
            margin-top: 14px;

            li {
              padding: 10px;
              border-radius: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              &.right-answer {
                background-color: ${({ theme }) =>
                  theme.colors.support.success_light};
                span {
                  color: ${({ theme }) => theme.colors.support.success};
                  font-weight: 600;
                }
              }
              &.wrong-answer {
                span {
                  color: ${({ theme }) => theme.colors.support.error};
                  font-weight: 600;
                }
              }

              span {
                color: ${({ theme }) => theme.colors.grayscale.gray_90};
                ${({ theme }) => theme.font.p.small};
              }

              .marked-answer.marked-answer {
                padding: 8px;
                border-radius: 4px;
                background-color: ${({ theme }) => theme.colors.brand.white};
                color: ${({ theme }) => theme.colors.grayscale.gray_90};
                ${({ theme }) => theme.font.p.extra_small_bold};
                box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }
  }

  footer {
    margin: 10em -1em 0;
    padding: 10px 3em 5em 3em;
    background-color: ${({ theme }) => theme.colors.brand.orange};

    .page-indicator {
      display: flex;
      justify-content: center;
      p {
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.extra_small};
      }
    }

    .advise {
      margin-top: 2em;
    }

    h1 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.h1};
      font-weight: 600;
    }
    p {
      margin-top: 1em;
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small};
    }
  }
`;
