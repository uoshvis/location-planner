import { AddBtnContainer, ButtonSubmit } from "./styles"

const AddBtn = (props) => {

    return (
        <AddBtnContainer>
            <ButtonSubmit
                type="submit"
                disabled={!props.dataIsValid}                
            >
            Add
            </ButtonSubmit>
        </AddBtnContainer>
    )
}

export default AddBtn