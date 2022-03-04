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
                handleTitleChange={props.handleTitleChange}
                title={props.title}
              />
            </ReactModal>
            
        </div>

    )    
    
  }


export default Modal;