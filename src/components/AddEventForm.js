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
        <form className='event-form' onSubmit={(e) => handleSubmit(e)}>
            <label className='label' htmlFor='title'>Title</label>
            <input
                className='input'
                type="text"
                name="title"
                id='title'
                placeholder='Enter title'
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
                <option value="" defaultValue hidden >Please Choose...</option>
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

            <label className='label' htmlFor='duration'>Duration</label>
                <select                
                onChange={handleDurationChange}
                className='input'
                name='duration'
                id='duration'
                >
                    <option value="30">30 min</option>
                    <option value="60">1 h</option>
                    <option value="90">1 h 30 min</option>
                    <option value="120">2 h</option>
                </select>

            <div className='add-btn-container'>
                <button
                    className='btn btn_submit'  
                    type="submit"
                >
                Add
                </button>
            </div>
        </form>
    )
    }

export default AddEventForm