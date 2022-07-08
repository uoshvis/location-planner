describe('Add new event', () => {
    beforeEach(() => {
      cy.visitLocal()
    })

    it('Adds new event on submit', () => {
    
        const title = 'New event title'

        cy.loaderIsNotVisible()

        cy.get('.rbc-date-cell').eq(10).click()

        cy.focused().type(title)

        cy.get('[name="location"]').select('loc1')

        cy.get('[name="duration"]').select('60')
            .type('{enter}')

        cy.modalIsNotVisible()

        cy.contains(title)

    })


}) 