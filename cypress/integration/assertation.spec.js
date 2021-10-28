/// <reference types="cypress" />
import navigation from "../fixtures/navigation.json";
describe("Assertation Exercise", () => {
	beforeEach("Visit, login and db reset", () => {
		cy.request("DELETE", "/api/boards");

		//definisanje login rute
		cy.intercept("/login").as("loggedIn");

		//loading the app
		cy.visit("/");

		//login
		cy.get(navigation.loginMenu).click();
		cy.get(navigation.usernameInput).type(Cypress.env("username"));
		cy.get(navigation.passwordInput).type(Cypress.env("password"));
		cy.get(navigation.loginButton).click();
		cy.get(navigation.loggedInUserMessage).should("be.visible").and("have.text", "User is logged in");
		cy.get(navigation.userProfile).should("contain", Cypress.env("username"));
		cy.wait("@loggedIn").then((intercept) => {
			expect(intercept.request.body.email).to.eq(Cypress.env("username"));
			expect(intercept.request.body.password).to.eq(Cypress.env("password"));
			expect(intercept.response.statusCode).to.eq(200);
		});
	});
	afterEach("Logout", () => {
		cy.get(navigation.userProfile).click();
		cy.get(navigation.logoutButton).click();
		cy.get(navigation.loginMenu).should("be.visible");
		cy.get(navigation.loginMenu).should("contain", "Log in");
	});

	it("Create Board", () => {
		cy.get(navigation.board).click();
		cy.get(navigation.boardInput).type("My board");
		cy.get(navigation.createBoardButton).click();
		cy.url().then((url) => {
			const id = url.match(/\/(\d+?)$/);

			cy.url().should("eq", `${Cypress.config("baseUrl")}/board/${id[1]}`);
		});

		cy.go("back");
		cy.get(navigation.boardItem).trigger("mouseover");
		cy.get(navigation.star).should("be.visible").click();

		cy.get(navigation.favoriteBoards).children().should("have.length", 1);
	});

	it("Create new board, add a list with tasks...", () => {
		cy.get(navigation.board).click();
		cy.get(navigation.boardInput).type("My Board{Enter}");
		cy.visit("/");
		cy.get("[data-cy='My Board']").click();

		// cy.get();
	});
});
