import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { koKR } from "@mui/x-date-pickers/locales";
import { createElement, forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(function LinkBehavior(props, ref) {
  const { href, ...other } = props;
  return createElement(RouterLink, { ref, to: href, ...other });
});

const theme = createTheme(
  {
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
    palette: {
      primary: {
        main: "#e60023",
      },
      secondary: {
        main: "#efefef",
      },
      error: {
        main: red.A400,
      },
    },
  },
  koKR,
);

export default theme;
