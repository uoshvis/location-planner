import UpdateDeleteBtns from '../../src/components/UpdateDeleteBtns'

const updateSelector = '[type=submit]'
const delteSelector = '[type=button]'

describe('Update btn', () => {
  it('Checks valid data add update enabled', () => {
    cy.mount(<UpdateDeleteBtns dataIsValid={true}/>)

    cy.get(updateSelector).should('contain.text', 'Update')
    cy.get(updateSelector).should('not.be.disabled')

  })

  it('Checks valid data add update disabled', () => {
    cy.mount(<UpdateDeleteBtns dataIsValid={false}/>)

    cy.get(updateSelector).should('contain.text', 'Update')
    cy.get(updateSelector).should('be.disabled')

  })
})


describe('Delete btn', () => {
  it('Checks valid data delete btn disabled', () => {
    cy.mount(<UpdateDeleteBtns dataIsValid={false}/>)

    cy.get(delteSelector).should('contain.text', 'Delete')
    cy.get(delteSelector).should('be.disabled')

  })

  it('Checks valid data delete btn enabled', () => {
    cy.mount(<UpdateDeleteBtns dataIsValid={true}/>)
  
    cy.get(delteSelector).should('contain.text', 'Delete')
    cy.get(delteSelector).should('not.be.disabled')
  
  })
})