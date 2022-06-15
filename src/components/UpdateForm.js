import EventForm from './EventForm'

const UpdateForm = props => {
    const buttons = 
        <div className='update-btn-container'>
            <button
                className='btn btn_submit'  
                type="button"
                onClick={() => props.handleDeleteEvent(props.currentEvent.id)}
            >
            Delete
            </button>

            <button 
                className='btn btn_submit' 
                type="submit"
            >
            Update
            </button>
        </div>

    return (
        <div>
            <h2 className= 'headline-secondary'>Update Event</h2>
            <EventForm
                currentEvent={props.currentEvent}
                onHandleSubmit={props.onUpdateEvent}
                buttons={buttons}
            />
        </div>
    )   
}

export default UpdateForm