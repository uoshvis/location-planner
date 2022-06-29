import React, { useState, useEffect } from 'react'
import moment from 'moment'
import cs from 'classnames'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import lt from 'date-fns/locale/lt';
import { ifInArray, formatMinDuration } from '../utils/helpers'
import {useCalculateDuration, useDurationIsValid} from '../utils/customHooks'
import * as Styled from './styles'
 

registerLocale('lt', lt)

const EventForm = props => {
    const durationValues = ['30', '60', '90', '120']    
    const [event, setEvent] = useState(props.currentEvent)
    const duration = useCalculateDuration(event.start, event.end)
    const durationIsValid = useDurationIsValid(duration)
    const [titleIsValid, setTitleIsValid] = useState(false)
    const [locationIsValid, setLocationIsValid] = useState(false)
    const [startDateIsValid, setStartDateIsValid] = useState(false)
    const [endDateIsValid, setEndDateIsValid] = useState(false)
    const [dataIsValid, setDataIsValid] = useState(false)
    
    
    useEffect(() => {
        setEvent(props.currentEvent)
      }, [props.currentEvent])

    useEffect(() => {
        // Title
        if(event.title) {
            setTitleIsValid(true)
        }
        else {
            setTitleIsValid(false)
        }
        // Location
        if (event.location) {
            setLocationIsValid(true)
        }
        else {
            setLocationIsValid(false)
        }
        //Start date
        if (event.start) {
            setStartDateIsValid(true)
        }
        else {
            setStartDateIsValid(false)
        }        
        //End date
        if (event.end) {
            setEndDateIsValid(true)
        }
        else {
            setEndDateIsValid(false)
        }
    }, [event])

    useEffect(() => {
        if (titleIsValid && locationIsValid && startDateIsValid && endDateIsValid && durationIsValid) {
            setDataIsValid(true)
        }
        else {
            setDataIsValid(false)
        }
    }, [titleIsValid, locationIsValid, startDateIsValid, endDateIsValid, durationIsValid])


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
        <Styled.EventForm onSubmit={ e => { handleSubmit(e) }} >
            <Styled.Label htmlFor='title'>Title</Styled.Label>
            
            <Styled.Input
                type="text"
                name="title"
                id='title'
                className={cs({ invalid: !titleIsValid })}
                value={event.title || ''}
                onChange={handleInputChange}
            />

            <Styled.Label htmlFor='location-select'>Location</Styled.Label>
            
            <Styled.Select
                name="location"
                id="location-select"
                className={cs({ invalid: !locationIsValid })}
                onChange={handleInputChange}
            >
                <option value="" defaultValue hidden >Please Choose...</option>
                <option value="loc1">Location 1</option>
                <option value="loc2">Location 2</option>
            </Styled.Select>

            
            <Styled.Label htmlFor='start'>Start Date</Styled.Label>

                <DatePicker
                    className={startDateIsValid ? 'input' : 'input input_invalid'}
                    selected={event.start}
                    onChange={handleStartChange}
                    locale="lt"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={30}
                    dateFormat="Pp"
                    id='start'
                />
            
                <Styled.Label htmlFor='end'>End Date</Styled.Label>

                
                <DatePicker
                    className={durationIsValid && endDateIsValid ? 'input' : 'input input_invalid'}
                    selected={event.end}
                    onChange={handleEndChange}
                    locale="lt"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={30}
                    dateFormat="Pp"
                    id='end'
                />

            <Styled.Label htmlFor='duration'>Duration</Styled.Label>
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

            {props.actionBtns(dataIsValid)}

        </Styled.EventForm>
    )   
}

export default EventForm