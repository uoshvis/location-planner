import ReactModal from "react-modal";
import AddEventForm from "./AddEventForm";
import UpdateEventForm from "./UpdateEventForm";

ReactModal.setAppElement('#root')


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

              { 
                !props.updateMode &&
                <AddEventForm
                  currentEvent={props.currentEvent}
                  addEvent={props.addEvent}
                />
              }

              { 
                props.updateMode &&
                <UpdateEventForm
                  currentEvent={props.currentEvent}
                  updateEvent={props.updateEvent}
                  deleteEvent={props.deleteEvent}
                  handleCloseModal={props.handleCloseModal}
                />
              }

            </div>


            <button id='btn-close' onClick={props.handleCloseModal}>X</button>

            </ReactModal>            
        </div>

    )    
    
  }


export default Modal;