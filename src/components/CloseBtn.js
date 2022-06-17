const CloseBtn = props => {
    return (
        <button 
            className='btn' 
            id='btn_close'
            onClick={props.onCloseModal}
        >
        <span>X</span>
        </button>
    )

}

export default CloseBtn