/// <reference types="cypress" />
import { Provider } from "react-redux";
import { Header } from "./Header";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";




describe("<Header />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders correctly', () => {
    cy.get('.header').should('exist');
  });



  it('displays the right content correctly', () => {
    cy.get('.header-right').within(() => {
      cy.get('.language').should('exist');
      cy.get('.currency').should('exist');
    });
  });

  it('displays the EN icon correctly', () => {
    cy.get('.language img').should('have.attr', 'src').and('include', 'enicon.png');
  });

  it('displays the USD icon correctly', () => {
    cy.get('.currency img').should('have.attr', 'src').and('include', 'USDIcon.png');
  });


  it('displays the USD text correctly', () => {
    cy.get('.currency').should('contain.text', 'USD');
  });


});
