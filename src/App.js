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
    this.handleTitleChange = this.handleTitleChange.bind(this)
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

  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <Calendar
          selectable
          localizer={localizer}
          style={{ height: 500 }}
          events={this.state.events}
          defaultView={Views.MONTH}
          defaultDate={new Date(2015, 3, 12)}
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
            handleTitleChange={this.handleTitleChange}
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
