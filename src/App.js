import React from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';
import './App.css';
import Form from './Form';

require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events,
      showForm: false,

    }

    this.handleSelectSlot = this.handleSelectSlot.bind(this)
    this.handeleSelectEvent = this.handeleSelectEvent.bind(this)

  }

  handleSelectSlot(e) {
    console.log(e)
    this.setState({
      showForm: true
    })
  }

  handeleSelectEvent(e) {
    console.log(e)
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

        {this.state.showForm &&

          <Form
            name={'Bob'}
          />

        }

      </div>
    );

  }

}

export default App;
