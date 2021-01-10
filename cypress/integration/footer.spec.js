describe('Footer', () => {
  context('with a single step', () => {
    it('displays a singular task in count', () =>{
      cy.seedAndVisit([{id: 1, name: 'Apply Cleanser', isComplete: false}])
      cy.get('.task-count').should('contain', '1 item left')
    })
  })

  context('with multiple tasks ', () => {
    beforeEach (() => {
      cy.seedAndVisit()
    })
    it('displays plural tasts in count', () => {
      cy.get('.task-count').should('contain', '3 items left')
    })

    it('Handles Filter links', () => {
      const filters = [{link: 'Active', expectedLength: 3},
      {link: 'Completed', expectedLength: 1},
    {link: 'All', expectedLength: 4}]
      cy.wrap(filters).each(filter => {
        cy.contains(filter.link).click()
        cy.get('.task-list li').should('have.length', filter.expectedLength)
      })

    })
  })
})
