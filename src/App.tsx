import { ThemeProvider } from "styled-components";
import { themesOptions } from "./styles/theme";
import GlobalStyle from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { encryptWithCTR } from "./utils/encript";
const queryClient = new QueryClient();

const encriptUserId = async (user_id: string) => {
  const payload = {
    id: user_id,
  };

  const token = await encryptWithCTR(JSON.stringify(payload));

  return token;
};

function App() {
  useEffect(() => {
    encriptUserId("3").then((e) => console.log(e));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
