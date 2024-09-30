import styled from "styled-components";

export const ReportContainer = styled.main`
  width: 100%;
  max-width: 800px;
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
    display: flex;
    gap: 2em;
    justify-content: space-between;
    margin-bottom: 3em;
    margin: 0 -1em;
    padding: 2em 3em 5em 3em;
    background-color: ${({ theme }) => theme.colors.brand.orange};

    .left-side {
      h2 {
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.normal};
      }

      h1 {
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.large_bold};
        font-weight: 600;
      }
    }

    .right-side {
      span {
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.extra_small};
      }

      h1 {
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.h1};
        font-weight: 900;
      }
    }
  }

  .content {
    .topic-section {
      margin-top: 10em;
      padding: 3em 2em;

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        h3 {
          color: ${({ theme }) => theme.colors.grayscale.gray_60};
          ${({ theme }) => theme.font.p.small};
          position: relative;
          z-index: 1;
        }

        .topic-subtitle {
          color: ${({ theme }) => theme.colors.grayscale.gray_05};
          ${({ theme }) => theme.font.p.small};
          opacity: 0.5;
          font-size: 10em;
          font-weight: 900;
          position: absolute;
          top: -180%;
          pointer-events: none;
          z-index: 0;
        }

        h2 {
          color: ${({ theme }) => theme.colors.brand.orange};
          ${({ theme }) => theme.font.h1};
          font-weight: 600;
          position: relative;
          z-index: 1;
        }

        h1 {
          text-align: center;
          color: ${({ theme }) => theme.colors.grayscale.gray_90};
          ${({ theme }) => theme.font.h3};
          font-size: 3em;
          font-weight: 900;
          position: relative;
          z-index: 1;
        }
      }

      .about-user-grade {
        margin-top: 1em;
        position: relative;
        z-index: 1;

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
        .questions-section-header {
          margin: 6em 0 4em;
          p {
            text-align: center;
            color: ${({ theme }) => theme.colors.grayscale.gray_40};
            ${({ theme }) => theme.font.p.extra_small};
          }
        }

        .question {
          padding: 1em;

          & + .question {
            margin-top: 4em;
            padding: 5em 1em 1em;
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
