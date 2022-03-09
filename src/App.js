import React from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';
import './App.css';
import Modal from './Modal';


require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    
    this.handleSelectSlot = this.handleSelectSlot.bind(this)
    this.handeleSelectEvent = this.handeleSelectEvent.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleUpdateForm = this.handleUpdateForm.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onDurationChange = this.onDurationChange.bind(this)

  }
  
  getInitialState = () => ({
    events,
    showModal: false,
    updatable: false,
    id: '',
    title: '',
    start: '',
    end: ''
  })

  resetState() {
    this.setState({
      events: [
        ...this.state.events
      ],
      showModal: false,
      updatable: false,
      id: '',
      title: '',
      start: '',
      end: ''
    });
  }

  handleSelectSlot({ start, end }) {
    this.setState({
      showModal: true,
      start,
      end
    })
  }

  handeleSelectEvent({ id, title, start, end }) {    
    this.setState({
      showModal: true,
      updatable: true,
      id,
      title,
      start,
      end,
    })
  }

  handleCloseModal() {
    this.resetState()
  }

  handleSubmitForm(e) {
    e.preventDefault();
    
    if (this.state.title){
      this.setState({
        events: [
          ...this.state.events,
          {
            id: Date.now(),
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,            
          }
        ],
        showModal: false,
        title: '',
        start: '',
        end: ''  
      })
    } else {alert('Please, enter the title')}   

  }

  handleUpdateForm(e) {
    e.preventDefault();

    const newEvents = this.state.events.map(event =>
      event.id === this.state.id
      ? {...event,
        title: this.state.title,
        start: this.state.start,
        end: this.state.end} : event
      )

    if (this.state.title){
      this.setState({
        events: [
          ...newEvents
        ],
        showModal: false,
        updatable: false,
        id: '',
        title: '',
        start: '',
        end: ''  
      })
    } else {alert('Please, enter the title')}

  }
  
  onDelete(id) {
    this.setState((prevState) => ({
      events: prevState.events.filter(item => item.id !== id),
      showModal: false, 
      updatable: false,
      id: '',
      title: '',
      start: '',
      end: ''
    }))
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value })
  }


  onDateChange({ isStartDate }, date) {
    isStartDate ? this.setState({ start: date }) : this.setState({ end: date })
  }

  onDurationChange(e) {
    this.setState({
      end: moment(this.state.start).add(Number(e.target.value), 'm').toDate(),
    })

  }


  render() {
    return (
      <div className="App">
        <Calendar
          selectable
          localizer={localizer}
          style={{ height: 800 }}
          events={this.state.events}
          defaultView={Views.MONTH}
          onSelectSlot={this.handleSelectSlot}
          onSelectEvent={this.handeleSelectEvent}
        />

        {this.state.showModal &&

          <Modal
            showModal={this.state.showModal}
            updatable={this.state.updatable}
            handleCloseModal={this.handleCloseModal}
            handleSubmitForm={this.handleSubmitForm}
            handleUpdateForm={this.handleUpdateForm}
            onDelete={this.onDelete}
            onTitleChange={this.onTitleChange}
            onDateChange={this.onDateChange}
            onDurationChange={this.onDurationChange}
            id={this.state.id}
            title={this.state.title}
            start={this.state.start}
            end={this.state.end}
          />

        }

      </div>
    );

  }

}

export default App;
