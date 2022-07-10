import AddBtn from '../../src/components/AddBtn'

const buttonSelector = '[type=submit]'

describe('<AddBtn>', () => {
  it('Checks valid data add btn enabled', () => {
    cy.mount(<AddBtn dataIsValid={true}/>)

    cy.get(buttonSelector).should('contain.text', 'Add')
    cy.get(buttonSelector).should('not.be.disabled')
    
  })

  it('Checks valid data add btn disabled', () => {
    cy.mount(<AddBtn dataIsValid={false}/>)
  
    cy.get(buttonSelector).should('contain.text', 'Add')
    cy.get(buttonSelector).should('be.disabled')
  
  })
})