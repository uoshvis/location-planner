
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import lt from 'date-fns/locale/lt';

registerLocale('lt', lt)

function Form(props) {

  return (
    <form onSubmit={
      props.updatable ? props.handleUpdateForm : props.handleSubmitForm
      }>
      <label>
        Event Title:
        <input type="text" value={props.title}
          onChange={props.onTitleChange}
        />
      </label>
      <div>
        Start Date:
        <DatePicker
          selected={props.start}
          onChange={(date) => props.onDateChange({isStartDate: true}, date)}
          locale="lt"
          showTimeSelect
          timeFormat="p"
          timeIntervals={30}
          dateFormat="Pp"
        />
      </div>
      <div>
        End Date:
        <DatePicker
          selected={props.end}
          onChange={(date) => props.onDateChange({isStartDate: false}, date)}
          locale="lt"
          showTimeSelect
          timeFormat="p"
          timeIntervals={30}
          dateFormat="Pp"
        />
      </div>
      <div>
        Set duration:
        <select
          // value={props.duration}
          onChange={props.onDurationChange}>
            <option value="30">30 min</option>
            <option value="60">1 h</option>
            <option value="90">1 h 30 min</option>
            <option value="120">2 h</option>
        </select>
      </div>

      <input id="btn-submit" type="submit" value={props.updatable ? "Update" : "Submit"} />
      {
        props.updatable &&
        <button id="btn-delete" type="button" onClick={() => props.onDelete(props.id)}>
        Delete
        </button>
      }

    </form>
  );      
  }


export default Form;  