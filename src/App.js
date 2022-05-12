import React, {useState} from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import initialEvents from './events';
import './App.css';
import Modal from './Modal';


require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


function App() {

  const [events, setEvents] = useState(initialEvents)
  const [showModal, setShowModal] = useState(false)
  const [updatable, setUpdatable] = useState(false)
  const [id, setId] = useState()
  const [title, setTitle] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()

  const resetState = () => {
    setShowModal(false)
    setUpdatable(false)
    setId()
    setTitle()
    setStart()
    setEnd()
  }

  const handleSelectSlot = ({ start, end }) => {
    setShowModal(true)
    setStart(start)
    setEnd(end)
  }

  const handeleSelectEvent = ({ id, title, start, end }) => {    
    setShowModal(true)
    setUpdatable(true)
    setId(id)
    setTitle(title)
    setStart(start)
    setEnd(end)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    
    if (title) {
      const newEvent = {
        id: Date.now(),
        title: title,
        start: start, 
        end: end
      }
      setEvents([...events, newEvent])
      resetState()
    }
    else {
      alert('Please enter the title')
    }
  }

  const handleUpdateForm = (e) =>  {
    e.preventDefault()

    const updatedEventList = events.map(event =>
      event.id === id ?
      {
        ...event,
        title: title,
        start: start, 
        end: end
      } : event
    )
    if (title) {
      setEvents(updatedEventList)
      resetState()
    }
    else {
      alert('Please, enter the title')
    }
  }

  const onDelete = (id) => {
    const filteredEventList = events.filter(event => event.id !== id)
    setEvents(filteredEventList)
    resetState()
  }

  const handleCloseModal = () => {
    resetState()
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onDateChange = ({ isStartDate }, date) => {
    isStartDate ? setStart(date) : setEnd(date)
  }

  const onDurationChange = (e) => { 
    setEnd(moment(start).add(Number(e.target.value), 'm').toDate())
  }


  return (
    <div className="App">
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
            updatable={updatable}
            handleCloseModal={handleCloseModal}
            handleSubmitForm={handleSubmitForm}
            handleUpdateForm={handleUpdateForm}
            onDelete={onDelete}
            onTitleChange={onTitleChange}
            onDateChange={onDateChange}
            onDurationChange={onDurationChange}
            id={id}
            title={title}
            start={start}
            end={end}
          />
        }
    </div>
  )
}


export default App;
