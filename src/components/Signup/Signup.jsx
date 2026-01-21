import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import btnCerrar from "../../../images/BotonCerrar.png";

const Signup = ({ handleRegistration }) => {
  console.log("Signup - handleRegistration:");
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Validar si todos los campos tienen valores
  const isFormValid = data.name && data.email && data.password;

  // Función de gestión de envíos.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="page">
      <div className="modal-overlay">
        <img
          className="popup__cerrar"
          src={btnCerrar}
          alt="Imagen botón cerrar"
          onClick={() => navigate("/")}
        />
        <div className="popup__heading">
          <h3>Regístrate</h3>
        </div>
        <form
          className="popup__form"
          name="signup-form"
          id="alta-usuario"
          method="post"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="popup__field">
            <input
              type="text"
              className="popup__input popup__input_type_name"
              maxLength="40"
              minLength="2"
              id="name"
              name="name"
              placeholder="Nombre(Nickname)"
              onChange={handleChange}
              required
            />
            <span className="popup__input_type_error name-error"></span>
          </label>
          <label className="popup__field">
            <input
              className="popup__input"
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              minLength="4"
              maxLength="10"
              required
            />
            <span
              className="popup__input_type_error acerca-error"
              id="password-error"
            ></span>
          </label>
          <label className="popup__field">
            <input
              type="text"
              className="popup__input popup__input_type_email"
              maxLength="40"
              minLength="2"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              required
            />
            <span className="popup__input_type_error email-error"></span>
          </label>

          <button
            className={`popup__button ${!isFormValid ? "popup__button_disabled" : ""}`}
            type="submit"
            disabled={!isFormValid}
          >
            Registro
          </button>
        </form>
        <div className="popup__footer">
          <div>¿Ya eres miembro? </div>
          <div>
            <button
              className="main__enlace"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Inicia sesión aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
