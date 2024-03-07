/// <reference types="cypress" />
import { Header } from './Header';

describe('<Header />', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('renders correctly', () => {
    cy.get('.header').should('exist');
  });

  it('displays the left content correctly', () => {
    cy.get('.header-left').should('contain.text', 'Kickdrum Internet Booking Engine');
  });

  it('displays the right content correctly', () => {
    cy.get('.header-right').within(() => {
      cy.get('.img1').should('exist');
      cy.get('.img2').should('exist');
    });
  });

  it('displays the EN icon correctly', () => {
    cy.get('.img1 img').should('have.attr', 'src').and('include', 'enicon.png');
  });

  it('displays the USD icon correctly', () => {
    cy.get('.img2 img').should('have.attr', 'src').and('include', 'USDIcon.png');
  });

  it('displays the EN text correctly', () => {
    cy.get('.en-text').should('have.text', 'en');
  });

  it('displays the USD text correctly', () => {
    cy.get('.USD-text').should('have.text', 'USD');
  });
});
