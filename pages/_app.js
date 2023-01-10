import "../App.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/theme";
import { useState } from "react";

import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <main className={roboto.className}>
        <Component
          {...pageProps}
          setDarkMode={setDarkMode}
          darkMode={darkMode}
        />
      </main>
    </ThemeProvider>
  );
}
