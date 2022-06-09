import React, { useState, useEffect } from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import lt from 'date-fns/locale/lt';

registerLocale('lt', lt)

const AddEventForm = props => {
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

    // TODO dynamic duration
    const handleDurationChange = e => {
        const newEnd = moment(event.start).add(Number(e.target.value), 'm').toDate()
        setEvent({...event, end:  newEnd})

    }

    const handleInputChange = e => {
        const { name, value } = e.target

        setEvent({ ...event, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        props.onCreateEvent(event)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='title'>Title</label>
            <input
                type="text"
                name="title"
                id='title'
                value={event.title || ''}
                onChange={handleInputChange} />
            

            <label htmlFor="location-select">Location</label>
            <select name="location" id="location-select" value={event.location} onChange={handleInputChange}>                
                <option value="" defaultValue hidden >Please Choose...</option>
                <option value="loc1">Location 1</option>
                <option value="loc2">Location 2</option>
            </select>         

            
            <div>

                <label htmlFor='start'>Start Date</label>

                <DatePicker
                    selected={event.start}
                    onChange={handleStartChange}
                    locale="lt"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={30}
                    dateFormat="Pp"
                    id='start'
                />            

            </div>
            
            <div>   
            
                <label htmlFor='end'>End Date</label>
                
                <DatePicker
                    selected={event.end}
                    onChange={handleEndChange}
                    locale="lt"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={30}
                    dateFormat="Pp"
                    id='end'
                />
            </div>

            <label htmlFor='duration'>Duration</label>
                <select
                onChange={handleDurationChange}
                name='duration'
                id='duration'>
                    <option value="30">30 min</option>
                    <option value="60">1 h</option>
                    <option value="90">1 h 30 min</option>
                    <option value="120">2 h</option>
                </select>

            <button id='btn-submit' type="submit">Add</button>
        </form>
    )
    }

export default AddEventForm