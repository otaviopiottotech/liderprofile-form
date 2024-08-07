import { ThemeProvider } from "styled-components";
import { themesOptions } from "./styles/theme";
import GlobalStyle from "./styles/global";
import Ques from "./pages/questionario";
import { useState } from "react";
import QuizScreen from "./pages/quiz";

function App() {
  const [changedView, setChangedView] = useState(false);

  return (
    <ThemeProvider theme={themesOptions["light"]}>
      <GlobalStyle />

      {/* <div style={{ width: "100%" }}>
        <button
          type="button"
          style={{
            padding: "6px 12px",
            margin: 6,
            border: "1px solid gray",
            borderRadius: 4,
          }}
          onClick={() => setChangedView(!changedView)}
        >
          mudar visão
        </button>

        {!changedView ? <QuizScreen /> : <Ques />}
      </div> */}
      <div style={{ width: "100%" }}>
        <QuizScreen />
      </div>
    </ThemeProvider>
  );
}

export default App;
