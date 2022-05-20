import ReactModal from "react-modal";
import AddEventForm from "./AddEventForm";
import UpdateEventForm from "./UpdateEventForm";
import {Fragment} from 'react'

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
                props.updateMode ? (<Fragment>
                  <h2>Update Event</h2>
                  <UpdateEventForm
                    currentEvent={props.currentEvent}
                    updateEvent={props.updateEvent}
                    deleteEvent={props.deleteEvent}
                    handleCloseModal={props.handleCloseModal}
                  />
                </Fragment>
                ) : (
                  <Fragment>
                    <h2>Add Event</h2>
                    <AddEventForm
                      currentEvent={props.currentEvent}
                      addEvent={props.addEvent}
                  />
                  </Fragment>
                )}

            </div>


            <button id='btn-close' onClick={props.handleCloseModal}>X</button>

            </ReactModal>            
        </div>

    )    
    
  }


export default Modal;