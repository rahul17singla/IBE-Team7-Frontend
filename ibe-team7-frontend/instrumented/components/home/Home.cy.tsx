import { Home } from './Home';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

describe("<Home />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders correctly', () => {
    cy.get('.home').should('exist');
  });



  it('has correct background image', () => {
    cy.get('.main').should('have.css', 'background-image');
  });

  it('applies correct padding on smaller screens', () => {
    cy.viewport(512, 768); // Change viewport to simulate smaller screen
    cy.get('.main').should('have.css', 'padding', '32px 16px');
  });


});
