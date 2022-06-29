import styled, { css } from 'styled-components'


const RADIUS_10 = '10px'

const lightCyan = css`
  color: #3174ad;
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

export { 
  HeadlineSecondary,
  EventForm,
  Label,
  AddBtnContainer,
  UpdateBtnContainer,
  Button,
  ButtonSubmit,
  ButtonClose,
  ButtonCloseText
}