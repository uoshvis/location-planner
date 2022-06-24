import { ButtonClose, ButtonCloseText } from "./styles"

const CloseBtn = props => {
    return (
        <ButtonClose onClick={props.onCloseModal}>
            <ButtonCloseText>X</ButtonCloseText>
        </ButtonClose>
    )
}

export default CloseBtn