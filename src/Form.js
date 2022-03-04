
function Form(props) {

  return (
    <form onSubmit={props.handleSubmitForm}>
      <label>
        Event Title:
        <input type="text" value={props.title}
          onChange={props.handleTitleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );      
  }


export default Form;  