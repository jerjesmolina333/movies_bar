import { useNavigate } from "react-router-dom";
import logoMV from "../../../images/Movies-Bar.png";

function Header({
  isLoggedIn,
  userData,
  handleLogout,
  moviesList,
  handleOpenPopupFavs,
}) {
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
      <div className="header__user-info">
        {isLoggedIn ? (
          <>
            <span className="header__user-name">Usuario: {userData.name}</span>
            {moviesList ? (
              <button
                className="header__favs-button"
                onClick={handleOpenPopupFavs}
              >
                Favoritos
              </button>
            ) : (
              <span className="header__user-message">Sin favoritos</span>
            )}

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
