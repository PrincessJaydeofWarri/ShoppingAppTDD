describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })
  it('Properly displays completed items', () => {
    cy.get('.task-list li').filter('.completed').should('have.length', 1)
    .and('contain', 'Toner').find('.toggle').should('be.checked')
  })

  it('Shows tasks remaining', () => {
    cy.get('.task-count').should('contain', 3)
  })
  it('Remove a task', () => {
    cy.route({
      url: '/api/tasks/1', method: 'DELETE', status: 200, response:{}
    })
    cy.get('.task-list li').as('list')

    cy.get('@list').first().find('.destroy').invoke('show').click()
    cy.get('@list').should('have.length', 3).and('not.contain', 'Cleanser')
  })

  it('Marks an incomplete step complete', () => {
    cy.fixture('tasks').then(tasks => {
      const target = Cypress._.head(tasks)
      cy.route('PUT', `/api/tasks/${target.id}`, Cypress._.merge(target, {isComplete: true}))

    })
    cy.get('.task-list li').first().as('first-task')

    cy.get('@first-task').find('.toggle').click().should('be.checked')

    cy.get('@first-task').should('have.class', 'completed')

    cy.get('.task-count').should('contain', 2)
  })
})
