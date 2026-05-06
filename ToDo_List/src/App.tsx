import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./app/providers";
import { AppRouter } from "./app/router";
import Navbar from "./components/navbar/NavBar";


const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
      <Navbar/>
      <AppRouter/>
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;