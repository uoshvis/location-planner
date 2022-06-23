const AddBtn = (props) => {

    return (
        <div className='add-btn-container'>
            <button
                className='btn btn_submit'  
                type="submit"
                disabled={!props.dataIsValid}                
            >
            Add
            </button>
        </div>
    )
}

export default AddBtn