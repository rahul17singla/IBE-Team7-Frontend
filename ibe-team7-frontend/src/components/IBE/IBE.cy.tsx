import IBE from './IBE'

describe('<IBE />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<IBE />)
  })
})