import EventForm from './EventForm'

const AddEventForm = props => {
    const buttons = 
        <div className='add-btn-container'>
            <button
                className='btn btn_submit'  
                type="submit"
            >
            Add
            </button>
        </div>

    return (
        <div>
            <h2 className="headline-secondary">Add New Event</h2>
            <EventForm
                currentEvent={props.currentEvent}
                onHandleSubmit={props.onCreateEvent}
                buttons={buttons}       
            />
        </div>
    )
}

export default AddEventForm