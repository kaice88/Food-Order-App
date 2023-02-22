import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
function BackDrop(props) {
  return <div className={styles.backdrop} onClick={props.onHideCart}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
const portalElement = document.getElementById("overlay");
function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onHideCart={props.onHideCart}></BackDrop>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
