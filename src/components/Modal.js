import ReactModal from "react-modal";
import AddEventForm from "./AddEventForm";
import UpdateEventForm from "./UpdateEventForm";
import { Fragment } from 'react'

ReactModal.setAppElement('#root')


function Modal(props) {

  const modalClassNames = {
    normal: 'modal-component',
    loading: 'modal-component loading',
    overlay: 'overlay'
  }

  return (
            <ReactModal
              isOpen={props.showModal}
              contentLabel={'Calendar form'}
              onRequestClose={props.onCloseModal}
              className={props.isLoading ? modalClassNames.loading : modalClassNames.normal}
              overlayClassName={modalClassNames.overlay}
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


            <button 
              className='btn' 
              id='btn_close'
              onClick={props.onCloseModal}
            >
            <span>X</span>
            </button>

            </ReactModal>            

    )    
    
  }


export default Modal;