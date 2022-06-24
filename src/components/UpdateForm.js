import EventForm from './EventForm'
import UpdateDeleteBtns from './UpdateDeleteBtns'
import * as Styled from './styles'


const UpdateForm = props => {
    return (
        <div>
            <Styled.HeadlineSecondary>Update Event</Styled.HeadlineSecondary>

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