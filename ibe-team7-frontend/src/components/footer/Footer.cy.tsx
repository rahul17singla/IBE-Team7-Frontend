// /// <reference types="cypress" />
// import { Footer } from './Footer';

// describe('<Footer />', () => {
//   beforeEach(() => {
//     cy.mount(<Footer />);
//   });

//   it('renders correctly', () => {
//     cy.get('.footer').should('exist');
//   });

//   it('displays the left content correctly', () => {
//     cy.get('.footerLeft').within(() => {
//       cy.get('.Kimg').should('exist');
//       cy.get('.Kimg').should('have.attr', 'src').and('include', 'image.png');
//       cy.get('.Kimg').should('have.attr', 'alt', 'hello');
//     });
//   });

//   it('displays the right content correctly', () => {
//     cy.get('.footerRight').should('exist');
//     cy.get('.footerRight').should('contain.text', '© Kickdrum Technology Group LLC.');
//     cy.get('.footerRight').should('contain.text', 'All rights reserved.');
//   });

//   it('has correct styling', () => {
//     cy.get('.footer').should('have.css', 'position', 'fixed');
//     cy.get('.footer').should('have.css', 'bottom', '0px');
//     cy.get('.footer').should('have.css', 'left', '0px');
//     cy.get('.footer').should('have.css', 'right', '0px');
//     cy.get('.footer').should('have.css', 'background-color', 'rgb(19, 7, 57)'); // #130739
//     cy.get('.footer').should('have.css', 'color', 'rgb(255, 255, 255)'); // #ffffff
//   });

//   it('has correct image styling', () => {
//     cy.get('.Kimg').should('have.css', 'height', '25px');
//     cy.get('.Kimg').should('have.css', 'position', 'absolute');
//   });

//   it('has correct text styling', () => {
//     cy.get('.footerRight').should('have.css', 'font-weight', '400');
//     cy.get('.footerRight').should('have.css', 'text-align', 'right');
//   });
// });

/// <reference types="cypress" />

import { Footer } from "./Footer";

describe("<Footer />", () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  it("renders correctly", () => {
    cy.get(".footer").should("exist");
  });

  it("displays the left content correctly", () => {
    cy.get(".footerLeft").within(() => {
      cy.get(".Kimg").should("exist");
      cy.get(".Kimg").should("have.attr", "src").and("include", "image.png");
      cy.get(".Kimg").should("have.attr", "alt").and("include", "Kickdrum");
    });
  });

  it("displays the right content correctly", () => {
    cy.get(".footerRight").should("exist");
    cy.get(".footerRight").should(
      "contain.text",
      "© Kickdrum Technology Group LLC."
    );
    cy.get(".footerRight").should("contain.text", "All rights reserved.");
  });

  it("has correct styling", () => {
    cy.get(".footer").should("have.css", "position", "fixed");
    cy.get(".footer").should("have.css", "bottom", "0px");
    cy.get(".footer").should("have.css", "left", "0px");
    cy.get(".footer").should("have.css", "right", "0px");
    cy.get(".footer").should("have.css", "background-color", "rgb(19, 7, 57)"); // #130739
    cy.get(".footer").should("have.css", "color", "rgb(255, 255, 255)"); // #ffffff
  });

  it("has correct text styling", () => {
    cy.get(".footerRight").should("have.css", "font-weight", "400");
    cy.get(".footerRight").should("have.css", "text-align", "right");
  });
});
