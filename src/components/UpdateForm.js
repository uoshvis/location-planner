import EventForm from './EventForm'
import UpdateDeleteBtns from './UpdateDeleteBtns'

const UpdateForm = props => {
    return (
        <div>
            <h2 className= 'headline-secondary'>Update Event</h2>

            <EventForm
                currentEvent={props.currentEvent}
                onHandleSubmit={props.onUpdateEvent}
                onHandleDelete={props.handleDeleteEvent}
                actionBtns={ (dataIsValid) => (
                    <UpdateDeleteBtns 
                        deleteEventHandler={props.handleDeleteEvent} 
                        event={props.currentEvent}
                        dataIsValid={dataIsValid}/>
                )}
            />
        </div>
    )   
}

export default UpdateForm