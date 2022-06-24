import { UpdateBtnContainer, ButtonSubmit } from "./styles"

const UpdateDeleteBtns = props => {
    
    return (
        <UpdateBtnContainer>
            <ButtonSubmit
                type="button"
                disabled={!props.dataIsValid}
                onClick={() => props.deleteEventHandler(props.event.id)}
            >
            Delete
            </ButtonSubmit>

            <ButtonSubmit 
                type="submit"
                disabled={!props.dataIsValid}
            >
            Update
            </ButtonSubmit>
        </UpdateBtnContainer>


    )   
}

export default UpdateDeleteBtns