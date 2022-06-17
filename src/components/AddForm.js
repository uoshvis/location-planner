import EventForm from './EventForm'
import AddBtn from './AddBtn'

const AddForm = props => {
    return (
        <div>
            <h2 className="headline-secondary">Add New Event</h2>
            <EventForm
                currentEvent={props.currentEvent}
                onHandleSubmit={props.onCreateEvent}
                actionBtns={ () => <AddBtn/> }       
            />
        </div>
    )
}

export default AddForm