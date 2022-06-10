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

    const handleSubmit = e => {
        e.preventDefault()

        props.onUpdateEvent(event)
    }

    return (
        <form className='event-form' onSubmit={(e) => handleSubmit(e)}>
            <label className='label' htmlFor='title'>Title</label>
            <input
                type="text"
                name="title"
                id='title'
                className='input'
                value={event.title || ''}
                onChange={handleInputChange} />


            <label className='label' htmlFor="location-select">Location</label>
            <select 
                name="location"
                id="location-select"
                className='input' 
                value={event.location}
                onChange={handleInputChange}
            >
                <option value="loc1">Location 1</option>
                <option value="loc2">Location 2</option>
            </select>
            <div>

                <label className='label' htmlFor='start'>Start Date</label>

                <DatePicker
                    className='input'
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
            
                <label className='label' htmlFor='end'>End Date</label>
                
                <DatePicker
                    className='input'
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

            <button
                className='btn'  
                id='btn_delete'
                type="button"
                onClick={() => props.onDeleteEvent(event.id)}
            >
            Delete
            </button>

            <button 
                className='btn' 
                id='btn_submit' 
                type="submit"
            >
            Update
            </button>

        </form>
    )   
    }

export default UpdateEventForm