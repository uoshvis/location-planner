import ReactModal from "react-modal";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
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
                  <UpdateForm
                    currentEvent={props.currentEvent}
                    onUpdateEvent={props.onUpdateEvent}
                    handleDeleteEvent={props.onDeleteEvent}
                  />
                </Fragment>
                ) : (
                  <Fragment>
                    <AddForm
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