Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:tasks') => {
  cy.server()
  cy.route('GET', '/api/tasks', seedData)
  cy.visit('/')
})
