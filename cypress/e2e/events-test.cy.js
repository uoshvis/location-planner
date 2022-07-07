describe('Display event by location', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Test Location 1 select', () => {

    cy.contains('Location 1').click()

    cy.contains('Point in Time Event loc1').click()
    
    cy.get('[name="title"]')
    .should('have.value', 'Point in Time Event loc1')

    cy.get('#location-select')
      .should('have.value', 'loc1')

    cy.get('.modal-component').type('{esc}')
    
    cy.contains('Today_loc2')
      .should('not.exist')
  })


  it('Test Location 2 select', () => {

    cy.contains('Location 2').click()

    cy.contains('Point in Time Event loc2').click()
    
    cy.get('[name="title"]')
    .should('have.value', 'Point in Time Event loc2')

    cy.get('#location-select')
      .should('have.value', 'loc2')

    cy.get('.modal-component').type('{esc}')
  
    cy.contains('Today_loc1')
      .should('not.exist')

  })


  it('Test Location All select', () => {
    cy.contains('All locations').click()

    cy.contains('Point in Time Event loc1')

    cy.contains('Point in Time Event loc2')

    cy.contains('Today_loc1')

    cy.contains('Today_loc2')

  })


  context('add new event', () => {
    it('Adds new event on submit', () => {
      
      const title = 'New event title'

      cy.get('.tail-spin-wrapper').should('not.exist')

      cy.get('.rbc-date-cell').eq(10).click()

      cy.focused().type(title)

      cy.get('[name="location"]').select('loc1')

      cy.get('[name="duration"]').select('60')
        .type('{enter}')

      cy.contains(title)


    })
  })
})


  