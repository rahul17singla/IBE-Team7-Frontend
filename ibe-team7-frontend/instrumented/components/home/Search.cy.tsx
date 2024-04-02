import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Search } from "./Search";

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

    it("renders correctly", () => {
        cy.get(".search-box").should("exist");
    });


    it("shows calendar when clicking on date button", () => {
        cy.get(".dates").click(); // Click on the date button
        cy.get(".calendar-view").should("be.visible"); // Ensure the calendar is visible
    });

  

    it("toggles calendar visibility when clicking on date button", () => {
      cy.get(".dates").click(); // Click on the date button
      cy.get(".calendar-view").should("be.visible"); // Ensure the calendar is visible
  });
  
  


  it("toggles guest counter visibility when clicking on guest dropdown", () => {
    cy.get(".dropdown-guest").click(); // Click on the guest dropdown
    cy.get(".guests-dropdown").should("be.visible"); // Ensure the guest counter is visible
});



it("verifies guest counter labels existence", () => {
  cy.get(".dropdown-guest").click(); // Click on the guest dropdown
  cy.get(".count-title").should("have.length", 3); // Verify that there are 3 labels for adults, teens, and children
});


  
it("verifies guest counter increment/decrement buttons existence", () => {
  cy.get(".dropdown-guest").click(); // Click on the guest dropdown
  cy.get(".count-btn").should("have.length", 9); // Verify that there are 6 buttons (3 for increment and 3 for decrement)
});



});
