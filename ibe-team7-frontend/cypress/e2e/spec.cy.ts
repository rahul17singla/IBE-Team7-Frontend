describe("E2E Integration Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.viewport(1920, 1080); // Set viewport to 550px x 750px
    });

    it("displays the footer", () => {
        cy.get(".footer").should("be.visible");
    });

    it("renders the search component", () => {
        cy.get(".search-form").should("be.visible");
    });

    it("verifies language dropdown options", () => {
        cy.get(".language").should("have.length", 2); // Assuming there are two language options
    });

    it("verifies currency dropdown options", () => {
        cy.get(".currency").should("have.length", 2); // Assuming there are two currency options
    });

    it("changes language when language dropdown is selected", () => {
        cy.get(".language select").select("fr");
        // Assert that the language has changed
        cy.get(".header-left__text").should(
            "contain",
            "Internet Booking Engine"
        ); // Assuming this text changes with the language
    });

    it("changes currency when currency dropdown is selected", () => {
        cy.get(".currency select").select("INR");
        // Assert that the currency has changed
        cy.get(".currency select").should("have.value", "INR");
    });

    it("displays the dates button", () => {
        cy.get(".dates").should("exist");
    });

    it("displays the guests dropdown", () => {
        cy.get(".dropdown-guest").should("exist");
    });

    it("displays the accessible room checkbox", () => {
        cy.get(".checkbox").should("exist");
    });

    it("displays the search button", () => {
        cy.get(".search-btn").should("exist");
    });

    it("selects dates in the calendar", () => {
        cy.get(".dates").click(); // Opens the calendar
        cy.get(".react-calendar").should("be.visible"); // Calendar is visible
        // You can add more interactions to select dates here
    });

    it("handles guest count increment/decrement", () => {
        cy.get(".dropdown-guest").click(); // Opens the guests dropdown
        cy.get(".guests-dropdown").should("be.visible"); // Dropdown is visible
        // You can add interactions to increment/decrement guest count here
    });

    //////////////////////////////////////

    it("renders the Header component", () => {
        cy.get(".header").should("be.visible");
    });

    it("navigates to Login page", () => {
        cy.get(".login-btn").click(); // Assuming there's a login button
        cy.url().should("include", "/login");
    });

    it("navigates to Signup page", () => {
        cy.visit("http://localhost:5173/login"); // Visit the login page
        cy.get("p > a").click(); // Click on the "SignUp Here" link
        cy.url().should("include", "/signup"); // Assert that the URL includes '/signup'
    });

    it("navigates to RoomResult page", () => {
        // Fill in the required fields
        cy.get(".dropdown").select("Team 7 Hotel"); // Assuming '#property' is the selector for the property input
        cy.get(".dates").click(); // Click to open the calendar
        cy.get(".react-calendar__tile").eq(20).click(); // Select a start date, change the index as needed
        cy.get(".react-calendar__tile").eq(22).click(); // Select an end date, change the index as needed
        cy.wait(2000);
        // Optionally, fill in additional fields if necessary

        // Click the apply dates button
        // cy.get(".disabled").click();
        cy.get("#apply-dates").click({ force: true });

        // Click the search button
        cy.get(".search-btn").click();

        // Wait for the navigation and assert the URL
        cy.url().should("include", "/room-result");
    });
});

describe("RoomResult Component", () => {
    beforeEach(() => {
        cy.visit(
            "http://localhost:5173/room-result?property=Team%207%20Hotel&room=1&startDate=21/04/2024&endDate=23/04/2024&adults=1&teens=0&kids=0&sort=0"
        ); // Assuming the RoomResult component is rendered at this URL
        cy.viewport(1920, 1080); // Set viewport to 1920x1080
    });

    it("displays the stepper", () => {
        cy.get(".options .MuiStepper-root").should("be.visible");
    });

    it("renders three steps in the stepper", () => {
        cy.get(".options .MuiStep-root").should("have.length", 3);
    });

    it("displays the footer", () => {
        cy.get(".footer").should("be.visible");
    });
});
