import { useNavigate } from "react-router-dom";
import logoMV from "../../../images/Movies-Bar.png";

function Header({ handleRegistration, isLoggedIn, userData, handleLogout }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src={logoMV}
        className="logo header__logo"
        alt="Logo"
        onClick={() => navigate("/home")}
      />
      <div className="header__line"></div>
      {console.log("Header - isLoggedIn:", isLoggedIn)}
      <div className="header__user-info">
        {isLoggedIn ? (
          <>
            <span className="header__user-name">{userData.name}</span>
            <button className="header__button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <button
            className="header__button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Suscribirse
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
