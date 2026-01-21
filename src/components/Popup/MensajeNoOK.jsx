import imgNoOK from "../../../images/ImgNoOK.png";
import btnCerrar from "../../../images/BotonCerrar.png";

const MensajeNoOK = (props) => {
  function cierraVentanaBoton() {
    props.handleClosePopup();
  }
  return (
    <div className="modal__message">
      <img
        className="popup__cerrar"
        src={btnCerrar}
        alt="Imagen botón cerrar"
        onClick={() => cierraVentanaBoton()}
      />
      <div className="popup__image-container">
        <img className="popup__img" src={imgNoOK} alt="Imagen No OK" />
      </div>
      <div className="popup__message">
        <p>Huy, algo salió mal. Por favor, inténtalo de nuevo.</p>
        <p>{props.mensajeError} </p>
      </div>
    </div>
  );
};

export default MensajeNoOK;
