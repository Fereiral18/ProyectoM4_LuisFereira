import { BrowserRouter } from "react-router-dom";
import "./style.css";
import { AppProviders } from "./app/providers";
import Navbar from "./components/navbar/NavBar";
import { AppRouter } from "./app/router";

const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="app-content">
            <AppRouter />
          </main>
        </div>
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;