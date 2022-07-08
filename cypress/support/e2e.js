Cypress.Commands.add('visitLocal', () => {
    cy.visit('/')
})

Cypress.Commands.add('loaderIsNotVisible', () => {
    cy.get('.tail-spin-wrapper').should('not.exist')
})

Cypress.Commands.add('modalIsNotVisible', () => {
    cy.get('.overlay').should('not.exist')
})