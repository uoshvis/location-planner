import React, {useState} from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'


import './App.css';
import Modal from './Modal';

import { getEvent, getEvents, getEventsbyLocation, createEvent, updateEvent, deleteEvent } from './fakeAPI/api';


require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


function App() {

  const initialEventState = { id: null, location: '', title: '', start: '', end: '' }
  const [location, setLocation] = useState('all')
  const [events, setEvents] = useState([])

  React.useEffect(() => {
    
    const doGetEvents = async () => {
      try {
        const result = await getEventsbyLocation(location)
        setEvents(result)
      } catch(error) {
        console.log(error)
      }
    }    
    doGetEvents()
  }, [location])

  const [currentEvent, setCurrentEvent] = useState(initialEventState)
  const [showModal, setShowModal] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)

  const handleSelectSlot = ({ start }) => {    
    setShowModal(true)
    setUpdateMode(false)
    const newStart = moment(start).add(Number(8), 'h').toDate()
    const newEnd = moment(newStart).add(Number(30), 'm').toDate()
    const defaultLocation = location === 'all' ? '' : location
    setCurrentEvent({...currentEvent, location: defaultLocation, start: newStart, end: newEnd})
  }

  const handeleSelectEvent = ({ id, location, title, start, end }) => {    
    setShowModal(true)
    setUpdateMode(true)
    setCurrentEvent({id: id, location: location, title: title, start: start, end: end})
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setUpdateMode(false)
    setCurrentEvent(initialEventState)
  }

  const addEvent = async (event) => {
    event.id = Date.now()

    try {
      await createEvent(event)
    } catch (error) {
      console.log(error)
    }

    handleCloseModal()
  }

  const handleUpdateEvent = (e, id, updatedEvent) => {
    e.preventDefault()
    // Data validation here OR inside API
    if (!updatedEvent.title || !updatedEvent.start || !updatedEvent.end) {
      alert('No title/start/end value')
      return 
    }
    setEvents(events.map((event) => (event.id === id ? updatedEvent : event)))
    handleCloseModal()
  }
  
  const deleteEvent = id => {
    setEvents(events.filter(event => event.id !== id))
    handleCloseModal()
  }

  const handleLocation = (e) => {
    setLocation(e.target.value)
  }


  return (
    <div className="App">
      <h1>Patient Planner</h1>
      
      <button className={location ==='all' ? `btn-location btn-location-normal btn-location-active` : `btn-location btn-location-normal` } value={'all'} onClick={(e) => handleLocation(e)}>
        All locations
      </button>   
      <button className={location ==='loc1' ? `btn-location btn-location-normal btn-location-active` : `btn-location btn-location-normal` } value={'loc1'} onClick={(e) => handleLocation(e)}>
        Location 1
      </button>
      <button className={location ==='loc2' ? `btn-location btn-location-normal btn-location-active` : `btn-location btn-location-normal` } value={'loc2'} onClick={(e) => handleLocation(e)}>
        Location 2
      </button>

        <Calendar
          selectable
          localizer={localizer}
          style={{ height: 800 }}
          events={events}
          defaultView={Views.MONTH}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handeleSelectEvent}
        />

        {showModal &&

          <Modal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            updateMode={updateMode}
            addEvent={addEvent}
            handleUpdateEvent={handleUpdateEvent}
            deleteEvent={deleteEvent}
            currentEvent={currentEvent}
          />
        } 
    </div>
  )
}


export default App;


// TODO Add location btn Component

// TODO Update events by location 

// TODO Location field in event

// TODO New event by location

// function Button() {

//   return (
//     <button className={`btn-location btn-${location}`} value={'loc1'} onClick={(e) => handleLocation(e)}>
//     Location 1
//   </button>
//   )
// }


// ToDo data fetching api mock  - useEffect
