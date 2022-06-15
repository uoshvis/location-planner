import React, { useState, useEffect } from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import lt from 'date-fns/locale/lt';

registerLocale('lt', lt)

const EventForm = props => {

    const [event, setEvent] = useState(props.currentEvent)
    const [duration, setDurationState] = useState('')
    const durationValues = [30, 60, 90, 120]   

    useEffect(() => {
        setEvent(props.currentEvent)
      }, [props])


    useEffect(() => {
        const startM = moment(event.start)
        const endM = moment(event.end)   
        const diff = moment.duration(endM.diff(startM)).asMinutes()
        setDurationState(diff)
      }, [event.start, event.end])

    const handleStartChange = start => {
        setEvent({...event, start:  start})
    }

    const handleEndChange = end => {
        setEvent({...event, end:  end})
    }

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

        props.onHandleSubmit(event)
    }
    
    const checkIfDurationExists = val => {
        return durationValues.indexOf(val) > -1
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

            <div>
                <label className='label' htmlFor='duration'>Duration</label>
                <select
                    name='duration'
                    className='input'
                    id='duration'
                    onChange={handleDurationChange}
                    value={duration}
                >
                    <option value="30">30 min</option>
                    <option value="60">1 h</option>
                    <option value="90">1 h 30 min</option>
                    <option value="120">2 h</option>
                    {!checkIfDurationExists(duration) ? 
                        <option value={duration}>{duration} min</option> : ''
                    }
                </select>
            </div>
            {/* display custom form buttons below */}

            {props.buttons}

        </form>
    )   
}

export default EventForm