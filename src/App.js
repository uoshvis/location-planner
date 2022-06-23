import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner';

import Modal from './components/Modal';
import LocationBtn from './components/LocationBtn';
import { getEventsByLocation, createEvent, updateEvent, deleteEvent } from './fakeAPI/api';


require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


function App() { 

  const initialEventState = {title: '', location: '',start: '', end: '' }
  const [location, setLocation] = useState('all')
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerStyle, setSpinnerStyle] = useState({})
  const [currentEvent, setCurrentEvent] = useState(initialEventState)
  const [showModal, setShowModal] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)
  const [status, setStatus] = useState({isError: false, errorCause: ''})


  const doGetEvents = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await getEventsByLocation(location)
      setEvents(result)
      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      alert(error)
    }
  }, [location] )
    
  useEffect(() => {
    doGetEvents()
  }, [doGetEvents])

  const refetchEvents = async () => {
    await doGetEvents()
  }

  useEffect(() => {
    if (status.isError) {
      alert(`Please check ${status.errorCause}`)
    }
  }, [status])
  
  // get spinner style from parent div css and pass to TailSpin Component

  const spinnerEl = useRef(null);

  useEffect(() =>  {
    // run only if style is not defined (once)
    if (isLoading && Object.keys(spinnerStyle).length === 0) {
      const spinnerColor = window.getComputedStyle(spinnerEl.current).getPropertyValue("color")
      const spinnerWidth = window.getComputedStyle(spinnerEl.current).getPropertyValue("width")
      const spinnerHeight = window.getComputedStyle(spinnerEl.current).getPropertyValue("height")

      setSpinnerStyle({
        color: spinnerColor,
        width: spinnerWidth,
        height: spinnerHeight
      })

    }
  }, [isLoading, spinnerStyle])

  const handleSelectSlot = ({ start }) => {    
    setShowModal(true)
    setUpdateMode(false)

    const newStart = moment(start).add(Number(8), 'h').toDate()
    const newEnd = moment(newStart).add(Number(30), 'm').toDate()
    const defaultLocation = location === 'all' ? '' : location
    
    setCurrentEvent({
      ...currentEvent, 
      location: defaultLocation, start: newStart, end: newEnd
    })
  }

  const handeleSelectEvent = ({ id, location, title, start, end }) => {    
    setShowModal(true)
    setUpdateMode(true)
    setCurrentEvent({
      id: id, location: location, title: title, start: start, end: end
    })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setUpdateMode(false)
    setCurrentEvent(initialEventState)
  }

  const handleCreateEvent = async (event) => {

    try {
      await createEvent(event)
      await refetchEvents()
      handleCloseModal()
    } catch (error) {      
      setStatus(
        {
          isError: true,
          errorCause: error.cause
        }
      )
    }
  }

  const handleUpdateEvent = async (updatedEvent) => {
  
    try {
      await updateEvent(updatedEvent.id, updatedEvent)
      await refetchEvents()
      handleCloseModal()
    } catch (error) {
      setStatus(
        {
          isError: true,
          errorCause: error.cause
        }
      )
    }
  }
  
  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id)
      await refetchEvents()
      handleCloseModal()
    } catch (error) {
      setStatus(
        {
          isError: true,
          errorCause: error.cause
        }
      )
    }
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  return (
    <div className="App">
      <h1 className='headline-primary'>Location Planner</h1>
      
        <LocationBtn
          location={location}
          handleLocationChange={handleLocationChange}
        />
        {
          isLoading &&
 
          <div className='tail-spin-wrapper' ref={spinnerEl}>
            <TailSpin
                height={spinnerStyle.height}
                width={spinnerStyle.width}
                color={spinnerStyle.color}
                visible={isLoading}
                ariaLabel='loading'
              />
          </div>

        }

        <Calendar
          selectable
          localizer={localizer}
          style={{ height: 800 }}
          className={isLoading ? 'loading' : ''}
          events={events}
          defaultView={Views.MONTH}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handeleSelectEvent}
        />
          
        {showModal &&

          <Modal
            showModal={showModal}
            isLoading={isLoading}
            onCloseModal={handleCloseModal}
            updateMode={updateMode}
            onCreateEvent={handleCreateEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
            currentEvent={currentEvent}
          />
         } 
    </div>
  )
}


export default App;


// Todo Add darkMode