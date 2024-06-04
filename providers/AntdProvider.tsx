"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import { FC, PropsWithChildren, useMemo } from "react";

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  const darkMode = useMemo(() => theme === "dark", [theme]);

  return (
    <ConfigProvider
      theme={{
        // ...antdTheme.defaultAlgorithm,
        algorithm: darkMode
          ? [antdTheme.darkAlgorithm]
          : [antdTheme.defaultAlgorithm],
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
