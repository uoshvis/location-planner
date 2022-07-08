describe('Edit event', () => {
    beforeEach(() => {
      cy.visitLocal()
    })

    it('Edits title and location', () => {
        const newTitle = 'This is a new title'

        cy.get('.rbc-event-content').first().click()

        cy.contains('Update Event').should('exist')

        cy.get('#title')
            .clear()
            .type(newTitle)

        cy.contains('[type="submit"]', 'Update').click()

        cy.modalIsNotVisible()

        cy.contains(newTitle).should('exist').click()

        cy.get('[name="location"]')
            .select('Location 1')
            .should('have.value', 'loc1')

        cy.get('[name="location"]')
            .select('Location 2')
            .should('have.value', 'loc2')


        cy.contains('[type="submit"]', 'Update').click()

        cy.modalIsNotVisible()

        cy.contains(newTitle).should('exist').click()

        cy.get('[name="location"]')
            .should('have.value', 'loc2')

        cy.get('.modal-component').type('{esc}')
    })


    it.only('Edits duration', () => {

        cy.get('.rbc-event-content').first().click()

        cy.contains('Update Event').should('exist')

        cy.get('[name="duration"]')
            .select('90')

        cy.contains('[type="submit"]', 'Update').click()

        cy.modalIsNotVisible()

        cy.get('.rbc-event-content').first().click()

        cy.contains('Update Event').should('exist')

        cy.get('[name="duration"]')
            .should('have.value', '90')
            
        cy.get('.modal-component').type('{esc}')

  })
}) 