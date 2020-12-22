describe('App initialization', () => {
  it('Loads tasks on page load', () => {
    cy.seedAndVisit()


    cy.get('.task-list li').should('have.length', 4)
  })

  it('Displays an error on failure', () => {
    cy.server()
    cy.route({
      url: '/api/tasks',
      method: 'GET',
      status: 500,
      response: {}
    })
    cy.visit('/')

    cy.get('.task-list li').should('not.exist')
    cy.get('.error').should('be.visible')
  })
})
