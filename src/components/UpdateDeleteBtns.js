const UpdateDeleteBtns = props => {
    
    return (
            <div className='update-btn-container'>
                <button
                    className='btn btn_submit'  
                    type="button"
                    onClick={() => props.deleteEventHandler(props.event.id)}
                >
                Delete
                </button>

                <button 
                    className='btn btn_submit' 
                    type="submit"
                >
                Update
                </button>
            </div>
    )   
}

export default UpdateDeleteBtns