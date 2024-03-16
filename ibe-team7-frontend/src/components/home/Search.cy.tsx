import { Home } from './Home';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Search } from './Search';

describe("<Search />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders correctly', () => {
    cy.get('.search-box').should('exist');
  });

  
  it('renders property options', () => {
    cy.get('#property1').should('exist'); // Ensure property dropdown exists
    cy.get('#property1 option').should('have.length', 4); // Ensure there are 4 options
  });

  it('shows calendar when clicking on date button', () => {
    cy.get('.dates').click(); // Click on the date button
    cy.get('.calendar-view').should('be.visible'); // Ensure the calendar is visible
  });


  it('selects check-in and check-out dates', () => {
    cy.get('.dates').click(); // Click on the date button
    cy.get('.react-calendar').should('be.visible'); // Ensure the calendar is visible

    // Select check-in date
    cy.contains('.react-calendar__tile', '15').click(); // Click on a date (assuming 15th is selectable)

    // Select check-out date
    cy.contains('.react-calendar__tile', '20').click(); // Click on another date (assuming 20th is selectable)

    cy.contains('Apply Dates').click(); // Click the Apply Dates button
    // Now assert that the selected dates are reflected in the UI
  });
  
})
