describe('Display events by location', () => {
  beforeEach(() => {
    cy.visitLocal()
  })
  
  context('Location 1 and 2 select', () => {
    it('Displays events by selected location', () => {
      const filters = [
        {location: 'Location 1', value: 'loc1', title: 'Point in Time Event loc1'},
        {location: 'Location 2', value: 'loc2', title: 'Point in Time Event loc2'}
      ]

      cy.wrap(filters)
        .each(filter => {
          cy.contains(filter.location).click()
      
          cy.contains(filter.title).click()
          
          cy.get('[name="title"]')
          .should('have.value', filter.title)
      
          cy.get('#location-select')
            .should('have.value', filter.value)
      
          cy.get('.modal-component').type('{esc}')

        })

    })
    
    it('Does not display location 2 event', () => {
     
      cy.contains('Location 1').click()

      cy.loaderIsNotVisible()
      
      cy.contains('Today_loc2')
        .should('not.exist')
    })

    it('Does not display location 1 event', () => {
     
      cy.contains('Location 2').click()

      cy.loaderIsNotVisible()
      
      cy.contains('Today_loc1')
        .should('not.exist')
    })

  })  

  context('All locations select', () => {
    it('Displays all events', () => {
      cy.contains('All locations').click()
  
      cy.contains('Point in Time Event loc1')
  
      cy.contains('Point in Time Event loc2')
  
      cy.contains('Today_loc1')
  
      cy.contains('Today_loc2')
  
    })
  })

})


  