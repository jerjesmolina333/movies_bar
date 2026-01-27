import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Home from "../Home/Home";
import NewsTicker from "../NewsTicker/NewsTicker";
import Popup from "../Popup/Popup";
import * as auth from "../utils/auth.js";
import { removeToken } from "../utils/token";
import RegisterOK from "../Popup/RegisterOK.jsx";
import MensajeNoOK from "../Popup/MensajeNoOK.jsx";
import Signup from "../Signup/Signup.jsx";
import Signin from "../Signin/Signin.jsx";
import { setToken, getToken } from "../utils/token.js";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CardPopup from "../Popup/CardPopup.jsx";
import { Api } from "../Api/Api.js";

function AppContent() {
  const [popup, setPopup] = useState(false);
  const [popupMovie, setPopupMovie] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const api = new Api();

  function abreRegExitoso() {
    handleOpenPopup({
      children: <RegisterOK handleClosePopup={handleClosePopup} />,
    });
    setTimeout(() => {
      handleClosePopup();
    }, 4000);
  }
  function abreMensajeError(err) {
    setPopup(null);
    try {
      handleOpenPopup({
        children: (
          <MensajeNoOK handleClosePopup={handleClosePopup} mensajeError={err} />
        ),
      });
    } catch (error) {
      console.error("❌ Error en abreMensajeError:", error);
    }
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleOpenPopupMovie(popup) {
    // console.log("App.jsx - handleOpenPopupMovie - popup:", popup);
    setPopupMovie(popup);
  }

  function handleClosePopup() {
    setPopup(false);
  }

  function handleClosePopupMovie() {
    setPopupMovie(false);
  }

  const handleRegistration = async ({ name, password, email }) => {
    try {
      await auth.signup(name, password, email);
      abreRegExitoso();
      // Esperar 4 segundos antes de navegar para que el usuario vea el popup
      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (err) {
      // console.error("Error en handleRegistration:", err);
      const mensajeError = err.message || "Error desconocido";
      console.log("Mensaje de error a mostrar:", mensajeError);
      abreMensajeError(mensajeError);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    try {
      const data = await auth.signin({ email, password, abreMensajeError });
      // const res = await auth.validaToken(data.token);
      // Guarda el token en el almacenamiento local:
      setToken(data.token);
      const datosUs = await auth.getUserInfo(data.token);
      setUserData(datosUs);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error("❌ App.jsx - Error en handleLogin:", err);
      abreMensajeError();
    }
  };

  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
    setUserData("");
    navigate("/signin");
  }

  useEffect(() => {
    const checkAuth = async () => {
      const jwt = getToken();
      if (!jwt) {
        console.log("useEffect. No hay token");
        setUserData({});
        setIsCheckingAuth(false);
        return;
      }
      try {
        const res = await auth.getUserInfo(jwt);
        const userData = res.data || res;
        setUserData(userData);
        setIsLoggedIn(true);
        console.log("useEffect: se van a buscar las películas del usuario...");
        const moviesList = await api.getUserMovies({
          userId: userData._id,
          token: jwt,
        });
        console.log("Películas del usuario cargadas:", moviesList);
        setIsCheckingAuth(false);
      } catch (err) {
        console.error("Error al validar token:", err);
        setIsLoggedIn(false);
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="page">
      <Header
        handleRegistration={handleRegistration}
        isLoggedIn={isLoggedIn}
        userData={userData}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NewsTicker />
              <Main
                handleOpenPopup={handleOpenPopup}
                handleOpenPopupMovie={handleOpenPopupMovie}
                onClose={handleClosePopup}
                userData={userData}
              />
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
        <Route
          path="/signin"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Signin
                handleLogin={handleLogin}
                handleClosePopup={handleClosePopup}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Signup
                handleRegistration={handleRegistration}
                handleOpenPopup={handleOpenPopup}
              />
            )
          }
        />
      </Routes>
      <Footer />
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      {popupMovie && (
        <CardPopup
          movie={popupMovie.movie}
          onClose={handleClosePopupMovie}
          userData={userData}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
