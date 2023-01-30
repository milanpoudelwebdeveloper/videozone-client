import "../App.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/theme";
import { useState } from "react";
import { Provider } from "react-redux";

import { Roboto } from "@next/font/google";
import { store } from "../redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCheck from "../components/AuthCheck";
import { GoogleOAuthProvider } from "@react-oauth/google";

import NProgress from "nprogress";

import "nprogress/nprogress.css";

import Router from "next/router";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <AuthCheck />
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <main className={roboto.className}>
            <ToastContainer />
            <Component
              {...pageProps}
              setDarkMode={setDarkMode}
              darkMode={darkMode}
            />
          </main>
          <div id="modals" />
        </ThemeProvider>
      </GoogleOAuthProvider>
      ;
    </Provider>
  );
}
