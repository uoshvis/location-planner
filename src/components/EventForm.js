import React, { useState, useEffect } from 'react'
import moment from 'moment'
import cs from 'classnames'
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
                autoFocus
                className={cs({ invalid: !titleIsValid })}
                value={event.title || ''}
                onChange={handleInputChange}
                placeholder='Enter title'
            />

            <Styled.Label htmlFor='location-select'>Location</Styled.Label>
            
            <Styled.Input
                as="select"
                name="location"
                id="location-select"
                className={cs({ invalid: !locationIsValid })}
                onChange={handleInputChange}
                value={event.location || ''}
            >
                <Styled.Option  defaultValue hidden>
                    Please Choose...
                </Styled.Option>
                <Styled.Option value="loc1">Location 1</Styled.Option>
                <Styled.Option value="loc2">Location 2</Styled.Option>
            </Styled.Input>
            
            <Styled.Label htmlFor='start'>Start Date</Styled.Label>

            <Styled.StyledDatePicker
                className={
                    cs({ invalid: !startDateIsValid || !durationIsValid })
                }
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
                
            <Styled.StyledDatePicker
                className={
                    cs({ invalid: !endDateIsValid || !durationIsValid })
                }
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
            <Styled.Input
                as='select'
                name='duration'
                className={cs({ invalid: !durationIsValid })}
                id='duration'
                onChange={handleDurationChange}
                value={duration}
            >
                <Styled.Option value="30">30 min</Styled.Option>
                <Styled.Option value="60">1 h</Styled.Option>
                <Styled.Option value="90">1 h 30 min</Styled.Option>
                <Styled.Option value="120">2 h</Styled.Option>
                {!ifInArray(durationValues, duration) ? 
                    <Styled.Option value={duration}> 
                        {durationIsValid ? formatMinDuration(duration) : 'Invalid duration'}
                    </Styled.Option> : ''
                }
            </Styled.Input>    

            {props.actionBtns(dataIsValid)}

        </Styled.EventForm>
    )   
}

export default EventForm