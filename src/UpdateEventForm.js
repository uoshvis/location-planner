import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import lt from 'date-fns/locale/lt';

registerLocale('lt', lt)

const UpdateEventForm = props => {
    
    const [event, setEvent] = useState(props.currentEvent)   

    useEffect(() => {
        setEvent(props.currentEvent)
      }, [props])

    const handleStartChange = start => {
        setEvent({...event, start:  start})
    }

    const handleEndChange = end => {
        setEvent({...event, end:  end})
    }

    const handleInputChange = e => {
        const { name, value } = e.target

        setEvent({ ...event, [name]: value })
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                if (!event.title || !event.start || !event.end) {
                    alert('No title/start/end value')
                    return
                }
                props.updateEvent(event.id, event)
            }}
        >
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={event.title}
                onChange={handleInputChange} />
            
            <label>Start Date</label>
            
            <DatePicker
                selected={event.start}
                onChange={handleStartChange}
                locale="lt"
                showTimeSelect
                timeFormat="p"
                timeIntervals={30}
                dateFormat="Pp"
            />            
            
            <label>End Date</label>
            
            <DatePicker
                selected={event.end}
                onChange={handleEndChange}
                locale="lt"
                showTimeSelect
                timeFormat="p"
                timeIntervals={30}
                dateFormat="Pp"
            />

            <button  type="button" onClick={() => props.deleteEvent(event.id)}>Delete</button>

            <button type="submit">Update</button>
        </form>
    )
    }

export default UpdateEventForm