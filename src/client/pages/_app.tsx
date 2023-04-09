import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "../styles/globals.scss";
import ThemeProvider from "../components/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
