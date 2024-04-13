import "./Buttom.css";
import PropTypes from "prop-types";

export const Buttom = (props) => {
  const { handleModal, tickets } = props;

  return (
    <button onClick={handleModal} className="buttom-submit" disabled={tickets === 0}>
      Obtener
    </button>
  );
};

Buttom.propTypes = {
  tickets: PropTypes.number.isRequired, // Validación para handleModal
  handleModal: PropTypes.func.isRequired, // Validación para handleModal
};
