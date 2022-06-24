import EventForm from './EventForm'
import AddBtn from './AddBtn'
import * as Styled from './styles'

const AddForm = props => {
    return (
        <div>
            <Styled.HeadlineSecondary>Add New Event</Styled.HeadlineSecondary>

            <EventForm
                currentEvent={props.currentEvent}
                onHandleSubmit={props.onCreateEvent}
                actionBtns={ (dataIsValid) => 
                <AddBtn
                    dataIsValid={dataIsValid}
                /> }       
            />
        </div>
    )
}

export default AddForm