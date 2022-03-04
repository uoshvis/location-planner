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
    super(props)

    this.state = {
      events,
      showModal: false,
      title: '',

    }

    this.handleSelectSlot = this.handleSelectSlot.bind(this)
    this.handeleSelectEvent = this.handeleSelectEvent.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  handleSelectSlot(e) {
    console.log(e)
    this.setState({
      showModal: true
    })
  }

  handeleSelectEvent(e) {
    console.log(e)
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }

  handleSubmitForm(e) {
    e.preventDefault();
    
    this.setState({
      showModal: false,
      title: ''
    })
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
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
            handleCloseModal={this.handleCloseModal}
            handleSubmitForm={this.handleSubmitForm}
            handleTitleChange={this.handleTitleChange}
            title={this.state.title}
          />

        }

      </div>
    );

  }

}

export default App;
