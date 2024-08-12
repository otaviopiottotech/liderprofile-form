import { ThemeProvider } from "styled-components";
import { themesOptions } from "./styles/theme";
import GlobalStyle from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <ThemeProvider theme={themesOptions["light"]}>
      <GlobalStyle />
      <div style={{ width: "100%" }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
