import React, {useState} from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner';

import './App.css';
import Modal from './components/Modal';
import LocationBtn from './components/LocationBtn';
import { getEventsByLocation, createEvent, updateEvent, deleteEvent } from './fakeAPI/api';


require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


function App() {

  const initialEventState = { id: null, location: '', title: '', start: '', end: '' }
  const [location, setLocation] = useState('all')
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false);

    
  const doGetEvents = React.useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await getEventsByLocation(location)
      setEvents(result)
      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [location] )
    
  React.useEffect(() => {
    doGetEvents() 
  }, [doGetEvents])
 
  const refetchEvents = async () => {
    await doGetEvents()
  }

  const [currentEvent, setCurrentEvent] = useState(initialEventState)
  const [showModal, setShowModal] = useState(false)
  const [updateMode, setUpdateMode] = useState(false)


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
    } catch (error) {
      console.log(error)
    }
    handleCloseModal()
  }

  const handleUpdateEvent = async (updatedEvent) => {
  
    try {
      await updateEvent(updatedEvent.id, updatedEvent)
      await refetchEvents()
    } catch (error) {
      console.log(error)
    }
    handleCloseModal()
  }
  
  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id)
      await refetchEvents()
    } catch (error) {
      console.log(error)
    }
    handleCloseModal()
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  return (
    <div className="App">
      <h1>Patient Planner</h1>
      
        <LocationBtn
          location={location}
          handleLocationChange={handleLocationChange}
        />

        <TailSpin
            height="100"
            width="100"
            color='grey'
            ariaLabel='loading'
            visible={isLoading}
            wrapperClass='tail-spin-wrapper'
          />

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

// TODO let continue if not valid (let to fix)