import { useNavigate } from "react-router-dom";
import logoMV from "../../../images/Movies-Bar.png";

function Header() {
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
      <button className="header__button">
        Suscribirse<a href=""></a>
      </button>
    </header>
  );
}

export default Header;
