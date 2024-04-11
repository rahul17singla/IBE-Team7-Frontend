describe("E2E Room Results Page Testing", () => {
    beforeEach(() => {
        cy.visit(
            "http://localhost:5173/room-result?property=Team%207%20Hotel&room=1&startDate=21/04/2024&endDate=23/04/2024&adults=1&teens=0&kids=0&sort=0"
        );
        cy.viewport(1920, 1080); // Set viewport to 550px x 750px
    });

    it("displays the footer", () => {
        cy.get(".footer").should("be.visible");
    });

    it("displays room cards", () => {
        cy.get(".room_card").should("be.visible");
    });

    it("displays the pagination", () => {
        cy.get(".pagination").should("be.visible");
    });

    it("navigates to RoomDetail Modal", () => {
        cy.get(".room_card").should("be.visible");
        cy.get(".room_select_button").first().click();
    });

    it("open modal", () => {
        cy.get(".room_select_button").first().click();

        cy.get(".room-modal").should("be.visible");
        
        
        
    });
});
