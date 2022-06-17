import React, { useState, useEffect } from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import lt from 'date-fns/locale/lt';
import { ifInArray, formatMinDuration } from '../utils/helpers'
import {useCalculateDuration, useDurationIsValid} from '../utils/customHooks'

registerLocale('lt', lt)

const EventForm = props => {

    const durationValues = ['30', '60', '90', '120']    
    const [event, setEvent] = useState(props.currentEvent)
    const duration = useCalculateDuration(event.start, event.end)
    const durationIsValid = useDurationIsValid(duration)
    
    useEffect(() => {
        setEvent(props.currentEvent)
      }, [props.currentEvent])
    
    const handleStartChange = start => {
        setEvent({...event, start:  start})
    }

    const handleEndChange = end => {
        setEvent({...event, end:  end})
    }

    const handleDurationChange = e => {
        const newEnd = moment(event.start)
            .add(Number(e.target.value), 'm')
            .toDate()
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
                    className={durationIsValid ? 'input' : 'input input_invalid'}
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
                    className={durationIsValid ? 'input' : 'input input_invalid'}
                    id='duration'
                    onChange={handleDurationChange}
                    value={duration}
                >
                    <option value="30">30 min</option>
                    <option value="60">1 h</option>
                    <option value="90">1 h 30 min</option>
                    <option value="120">2 h</option>
                    {!ifInArray(durationValues, duration) ? 
                        <option value={duration}> 
                            {durationIsValid ? formatMinDuration(duration) : 'Invalid duration'}
                        </option> : ''
                    }
                </select>
            </div>
            
            { props.actionBtns() }

        </form>
    )   
}

export default EventForm