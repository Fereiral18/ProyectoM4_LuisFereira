import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/themeContext";


export const AppProviders = ({ children }: any) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};