import { Route, Routes } from "react-router-dom";
import GameBoard from "./pages/GameBoard";

function App() {
  return (
    // <div className="App">
    <Routes>
      <Route path="/" element={<GameBoard />} />
    </Routes>
    // </div>
  );
}

export default App;
