import { ThemeProvider } from "styled-components";
import { themesOptions } from "./styles/theme";
import GlobalStyle from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider theme={themesOptions["light"]}>
      <GlobalStyle />
      <Toaster
        richColors
        closeButton
        position="bottom-center"
        duration={8000}
      />
      <div style={{ width: "100%" }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
