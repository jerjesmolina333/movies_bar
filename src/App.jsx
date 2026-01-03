import { useState } from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import NewsTicker from "./components/NewsTicker/NewsTicker";
import Popup from "./components/Popup/Popup";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [popup, setPopup] = useState(false);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(false);
  }

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
                  <Main handleOpenPopup={handleOpenPopup} />
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
          {popup && (
            <Popup onClose={handleClosePopup} title={popup.title}>
              {popup.children}
            </Popup>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
