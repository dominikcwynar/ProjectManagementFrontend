import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import WebFont from "webfontloader";
WebFont.load({
  google: {
    families: ["Viga:400", "sans-serif"],
  },
});

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#fff", "gray.600")(props),
        color: mode("gray.700", "#fff")(props),
        fontFamily: "Viga",
        fontWeight: "bold",
      },
    }),
  },
  colors: {
    transparent: "transparent",
    white: "#fff",
    gray: {
      100: "#475897",
      200: "#c9c9c9",
      700: "#0f4c81",
    },
    primary: {
      50: "#e1f4ff",
      100: "#b7dbfa",
      200: "#8dc3f2",
      300: "#61abeb",
      400: "#3893e4",
      500: "#2279cc",
      600: "#185e9f",
      700: "#0d4372",
      800: "#032847",
      900: "#000e1c",
    },
    secondary: {
      50: "#f9ecfe",
      100: "#dfcbe9",
      200: "#7364A8",
      300: "#475897",
      400: "#9967b1",
      500: "#7364A8", //normal button
      600: "#475897", //hover button
      700: "#9967b1", //button onClick
      800: "#2c1936",
      900: "#120617",
    },
  },
});
