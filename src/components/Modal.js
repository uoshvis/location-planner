import ReactModal from "react-modal";
import AddEventForm from "./AddEventForm";
import UpdateEventForm from "./UpdateEventForm";
import {Fragment} from 'react'

ReactModal.setAppElement('#root')


function Modal(props) {

  return (
            <ReactModal
              isOpen={props.showModal}
              contentLabel={'Calendar form'}
              onRequestClose={props.onCloseModal}
              className={props.isLoading ? "modal-component loading" : 'modal-component'}
              overlayClassName="overlay"
              parentSelector={() => document.querySelector('.App')}
            >
            <div>
            { 
                props.updateMode ? (<Fragment>
                  <h2>Update Event</h2>
                  <UpdateEventForm
                    currentEvent={props.currentEvent}
                    onUpdateEvent={props.onUpdateEvent}
                    onDeleteEvent={props.onDeleteEvent}
                    onCloseModal={props.onCloseModal}
                  />
                </Fragment>
                ) : (
                  <Fragment>
                    <h2>Add Event</h2>
                    <AddEventForm
                      currentEvent={props.currentEvent}
                      onCreateEvent={props.onCreateEvent}
                  />
                  </Fragment>
                )}

            </div>


            <button id='btn-close' onClick={props.onCloseModal}>X</button>

            </ReactModal>            

    )    
    
  }


export default Modal;