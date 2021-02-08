describe('Smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', 'api/tasks').its('body').each(task =>
      cy.request('DELETE', `api/tasks/${task.id}`))
//empties any current tasks //
  })
  context('with no tasks', () => {
    it('saves new tasks', () => {
      const items = [{text: 'Buy Skincare', expectedLength: 1},
    {text: 'Buy Haircare', expectedLength: 2},
  {text: 'But Strawberries', expectedLength: 3}]
      cy.visit('/')
      cy.server()
      cy.route('POST', 'api/tasks').as('create')
      cy.wrap(items).each(task => {
        cy.focused().type(task.text).type('{enter}')
        cy.wait('@create')
        cy.get('.task-list li').should('have.length', task.expectedLength)

      })

    })

  })
context('With active tasks', () => {
  beforeEach(() => {
    cy.fixture('tasks').each(task => {
      const newTask = Cypress._.merge(task, {isComplete: false})
      cy.request('POST', '/api/tasks', newTask)
    })
    cy.visit('/')
  })
  it('Loads exisiting data from database', () => {
    cy.get('.task-list li').should('have.length', 4)
  })
  it('Deletes tasks', () => {
    cy.server()
    cy.route('DELETE', 'api/tasks/*').as('delete')
    cy.get('.task-list li').each($el => {
      cy.wrap($el).find('.destroy').invoke('show').click()

      cy.wait('@delete')
    }).should('not.exist')
  })
it('Toggles tasks', () => {
  const clickAndWait = ($el) => {
    cy.wrap($el).as('item').find('.toggle').click()
    cy.wait('@update')

  }
  cy.server()
  cy.route('PUT', '/api/tasks/*').as('update')
  cy.get('.task-list li').each($el => {
    clickAndWait($el)
    cy.get('@item').should('have.class', 'completed')
  })
  .each($el => {
    clickAndWait($el)
    cy.get('@item').should('not.have.class', 'completed')
  })
})
})
})
