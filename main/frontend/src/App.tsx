import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { GameDetail } from "./pages/GameDetail/GameDetail";
import { Favorites } from "./pages/Favorites/Favorites";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
