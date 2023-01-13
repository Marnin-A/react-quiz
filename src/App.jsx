import { Routes, Route } from "react-router-dom";
import { Home, Quiz } from "./pages";
import styles from "./App.module.css";

// 🟡Notes🟡
//  1. Change font

function App() {
  return (
    <div className={styles.app}>
      <nav>
        <h1>
          Welcome to the React Quiz by{"\u00A0"}
          <a href="https://portfolio-marnin-a.vercel.app/">Marnin_a</a>
        </h1>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
