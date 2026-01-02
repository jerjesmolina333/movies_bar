import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import NewsTicker from "./components/NewsTicker/NewsTicker";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="page">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NewsTicker />
                  <Main />
                </>
              }
            />
            <Route
              exact
              path="/home"
              element={
                <>
                  <Home />
                </>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
