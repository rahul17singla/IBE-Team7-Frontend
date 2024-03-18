describe('E2E Integration Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });


  
  it('displays the footer', () => {
    cy.get('.footer').should('be.visible');
  });

  it('renders the search component', () => {
    cy.get('.search-form').should('be.visible');
  });



  it('verifies language dropdown options', () => {
    cy.get('.language').should('have.length', 2); // Assuming there are two language options
  });

  it('verifies currency dropdown options', () => {
    cy.get('.currency').should('have.length', 2); // Assuming there are two currency options
  });





  it('changes language when language dropdown is selected', () => {
    cy.get('.language select').select('fr');
    // Assert that the language has changed
    cy.get('.header-left__text').should('contain', 'Internet Booking Engine'); // Assuming this text changes with the language
  });
  
  it('changes currency when currency dropdown is selected', () => {
    cy.get('.currency select').select('INR');
    // Assert that the currency has changed
    cy.get('.currency select').should('have.value', 'INR');
  });






  it('displays the property name dropdown', () => {
    cy.get('#property1').should('exist');
  });

  it('displays the dates button', () => {
    cy.get('.dates').should('exist');
  });

  it('displays the guests dropdown', () => {
    cy.get('.dropdown-guest').should('exist');
  });

  it('displays the rooms dropdown', () => {
    cy.get('#property3').should('exist');
  });

  it('displays the accessible room checkbox', () => {
    cy.get('.checkbox').should('exist');
  });

  it('displays the search button', () => {
    cy.get('.search-btn').should('exist');
  });

 

  it('selects dates in the calendar', () => {
    cy.get('.dates').click(); // Opens the calendar
    cy.get('.react-calendar').should('be.visible'); // Calendar is visible
    // You can add more interactions to select dates here
  });

  it('handles guest count increment/decrement', () => {
    cy.get('.dropdown-guest').click(); // Opens the guests dropdown
    cy.get('.guests-dropdown').should('be.visible'); // Dropdown is visible
    // You can add interactions to increment/decrement guest count here
  });

  it('validates room selection', () => {
    cy.get('#property3').select('2'); // Selecting a room count option
    cy.get('#property3').should('have.value', '2'); // Assuming the value of the selected option is the room count
  });

 

});
