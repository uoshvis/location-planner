import styled, { css } from 'styled-components'
import DatePicker from "react-datepicker";


const RADIUS_10 = '10px'

const lightCyan = css`
  color: #3174ad;
`

const inputStyle = css`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
  color: white;
  width: 100%;

  ::placeholder {
    color: white
  }
`

const invalidInputStyle = css`
  background-color: purple;
  border-radius: ${RADIUS_10};
`

const HeadlineSecondary = styled.h2`
    ${lightCyan};

    font-size: 24px;
    letter-spacing: 2px;
    text-align: center;
`

const EventForm = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  padding-left: 5px;
  font-size: 24px;
`

const Input = styled.input`
  ${inputStyle};

  &.invalid {
    ${invalidInputStyle};
  }
`

const Option = styled.option`
  margin: 40px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);  
`

const AddBtnContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`

const UpdateBtnContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  border: 1px solid #f3ebeb;
  border-radius: ${RADIUS_10};
  outline: none;
  padding: 12px 16px;
  margin: 1px;
  background-color: white;
  transition: all 0.1s ease-in;
  cursor: pointer;
`

const ButtonSubmit = styled(Button)`
  width: 40%;
`

const ButtonClose = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  border-top-right-radius: ${RADIUS_10};
  background-color: #666;
  color: white;
  padding: 5px 8px;
  margin: 0;
`

const ButtonCloseText = styled.span`
  font-size: 15px;
`

const StyledDatePicker = styled(DatePicker)`
  ${inputStyle};

  &.invalid {
    ${invalidInputStyle};
  }
`

export {
  HeadlineSecondary,
  EventForm,
  Label,
  Input,
  Option,
  AddBtnContainer,
  UpdateBtnContainer,
  Button,
  ButtonSubmit,
  ButtonClose,
  ButtonCloseText,
  StyledDatePicker
}