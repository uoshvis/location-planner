import React, {useState} from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import initialEventsLoc1 from './events_loc1';
import initialEventsLoc2 from './events_loc2';

import './App.css';
import Modal from './Modal';


require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


function App() {

  const initialEventState = { id: null, tile: '', start: '', end: '' }

  const [events, setEvents] = useState([...initialEventsLoc1, ...initialEventsLoc2])
  const [currentEvent, setCurrentEvent] = useState(initialEventState)
  const [showModal, setShowModal] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)

  const [location, setLocation] = useState('all')


  const handleSelectSlot = ({ start }) => {    
    setShowModal(true)
    setUpdateMode(false)
    const newStart = moment(start).add(Number(8), 'h').toDate()
    const newEnd = moment(newStart).add(Number(30), 'm').toDate()
    setCurrentEvent({...currentEvent, start: newStart, end: newEnd})
  }

  const handeleSelectEvent = ({ id, title, start, end }) => {    
    setShowModal(true)
    setUpdateMode(true)
    setCurrentEvent({id: id, title: title, start: start, end: end})
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setUpdateMode(false)
    setCurrentEvent(initialEventState)
  }

  const addEvent = (event) => {
    event.id = Date.now()

    setEvents([...events, event])
    handleCloseModal()
  }

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map((event) => (event.id === id ? updatedEvent : event)))
    handleCloseModal()
  }
  
  const deleteEvent = id => {
    setEvents(events.filter(event => event.id !== id))
    handleCloseModal()
  }

  const handleLocation = (e) => {
    const locValue = e.target.value

    if (locValue === 'loc1')  {
      setEvents(initialEventsLoc1)
      setLocation('loc1')
      

    }
    else if (locValue === 'loc2') {
      setLocation('loc2')
      setEvents(initialEventsLoc2)
    }

    else if (locValue ==='all') {
      setLocation('all')
      setEvents([ ...initialEventsLoc1, ...initialEventsLoc2 ])
    }    

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
            updateEvent={updateEvent}
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