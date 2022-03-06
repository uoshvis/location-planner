import ReactModal from "react-modal";
import Form from "./Form"

ReactModal.setAppElement('#root');


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: 'lightsteelblue'
    },
    overlay: {
      backgroundColor: 'lightgreen',
      zIndex: '5',
    },
  };
  


function Modal(props) {
    return (
        <div>
            <ReactModal
              isOpen={props.showModal}
              style={customStyles}
              contentLabel={'Calendar form'}
              onRequestClose={props.handleCloseModal}
            >
            <Form
              handleSubmitForm={props.handleSubmitForm}
              handleUpdateForm={props.handleUpdateForm}
              onDelete={props.onDelete}
              handleTitleChange={props.handleTitleChange}
              updatable={props.updatable}
              id={props.id}
              title={props.title}
              start={props.start}
              end={props.end}
            />

            <button id='btn-close' onClick={props.handleCloseModal}>Close</button>

            </ReactModal>
            
        </div>

    )    
    
  }


export default Modal;