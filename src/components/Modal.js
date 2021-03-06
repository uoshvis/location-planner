import ReactModal from "react-modal";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
import CloseBtn from "./CloseBtn";

ReactModal.setAppElement('#root')


function Modal(props) {

  const modalContentClassNames = {
    normal: 'modal-component',
    loading: 'modal-component loading',
    overlay: 'overlay'
  }

  return (
    <ReactModal
      isOpen={props.showModal}
      contentLabel={'Calendar form'}
      onRequestClose={props.onCloseModal}
      className={props.isLoading ? modalContentClassNames.loading : modalContentClassNames.normal}
      overlayClassName={modalContentClassNames.overlay}
      parentSelector={() => document.querySelector('.App')}
    >
      { 
        props.updateMode ? 
          <UpdateForm
            currentEvent={props.currentEvent}
            onUpdateEvent={props.onUpdateEvent}
            handleDeleteEvent={props.onDeleteEvent}
          />
        : 
          <AddForm
            currentEvent={props.currentEvent}
            onCreateEvent={props.onCreateEvent}
          />
      }

      <CloseBtn onCloseModal={props.onCloseModal}/>

    </ReactModal>            
  )    
}

export default Modal;