import "../App.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/theme";
import { useState } from "react";
import { Provider } from "react-redux";

import { Roboto } from "@next/font/google";
import { store } from "../redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
