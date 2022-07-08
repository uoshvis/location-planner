describe('Delete event', () => {
    beforeEach(() => {
      cy.visitLocal()
    })

    it('Selects and deletes event', () => {
    
        cy.get('.rbc-event-content').first().click()

        cy.get('#title').then(v => {
            const title = Cypress.$(v).val()

            cy.contains('Delete').click()

            cy.modalIsNotVisible()

            cy.contains(title).should('not.exist')

        })
    })

}) 