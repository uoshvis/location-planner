
function Form(props) {
  return (
    <form onSubmit={props.handleSubmitForm}>
      <label>
        Event Title:
        <input type="text" value={props.title}
          onChange={props.handleTitleChange}
        />
      </label>
        <p>Start: {props.start.toString()}</p>
        <p>End: {props.end.toString()}</p>
        
      <input type="submit" value="Submit" />
    </form>
  );      
  }


export default Form;  