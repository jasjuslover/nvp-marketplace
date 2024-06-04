import { ThemeProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";

const Theme: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Theme;
