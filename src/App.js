import React from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';
import './App.css';

require('moment/locale/lt.js')

const localizer = momentLocalizer(moment)


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events,      
    }

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
        />
      </div>
    );

  }

}

export default App;
