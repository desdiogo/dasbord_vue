const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe("Home", () => {
  it('should render create account modal when click on cta create account button', () => {
    cy.visit(APP_URL)

    cy.get('#cta-create-account-button').click()

    cy.get('#modal-create-account')
  })
})