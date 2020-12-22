describe('Input form', () => {
  beforeEach(() => {
    cy.seedAndVisit([])
  })

  it('focuses input on load', () => {
    cy.focused()
    .should('have.class', 'new-task')

  })

  it('Accepts input', () => {
    const typedText = 'Buy Skincare'
    cy.get('.new-task').type(typedText).should('have.value', typedText)
  })

  context('Form submission', () => {
    beforeEach(() => {
      cy.server()
    })


    it('Adds a new task on submit', () => {
    const newItem = 'Buy Haircare '
    cy.route('POST', 'api/tasks', {
      name: newItem,
      id:1,
      isComplete: false

    })
      cy.get('.new-task').type(newItem).type('{enter}').should('have.value', '')
      cy.get('.task-list li').should('have.length', 1).and('contain', newItem)
    })
    it('Shows an error message on a failed submission', () => {
      cy.route({
        url: '/api/tasks',
        method: 'POST',
        status: 500,
        response:{}
      })
      cy.get('.new-task').type('test{enter}')
      cy.get('.task-list li').should('not.exist')
      cy.get('.error').should('be.visible')

    })
  })
})
