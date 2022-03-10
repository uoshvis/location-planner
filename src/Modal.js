import ReactModal from "react-modal";
import Form from "./Form"


function Modal(props) {

    return (
        <div>
            <ReactModal
              isOpen={props.showModal}
              contentLabel={'Calendar form'}
              onRequestClose={props.handleCloseModal}
              className="Modal"
              overlayClassName="Overlay"
              parentSelector={() => document.querySelector('.App')}
            >
            <div>
              <Form
                handleSubmitForm={props.handleSubmitForm}
                handleUpdateForm={props.handleUpdateForm}
                onDelete={props.onDelete}
                onTitleChange={props.onTitleChange}
                onDateChange={props.onDateChange}
                onDurationChange={props.onDurationChange}
                updatable={props.updatable}
                id={props.id}
                title={props.title}
                start={props.start}
                end={props.end}
              />
            </div>


            <button id='btn-close' onClick={props.handleCloseModal}>X</button>

            </ReactModal>
            
        </div>

    )    
    
  }


export default Modal;