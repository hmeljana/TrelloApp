import myBoards from "../fixtures/myBoards.json";
import boards from "../fixtures/boards.json";
import qaBoard from "../fixtures/qaBoard.json";

describe("Create Boards and Assert Data", () => {
	it("Assertation of all boards", () => {
		cy.intercept("GET", "/api/boards", { fixture: "boards.json" }).as("stubbedBoards");
		cy.visit("/");
		cy.get(myBoards.boardOneTitle).should("contain", boards[0].name);
		cy.get(myBoards.boardTwoTitle).should("contain", boards[1].name);
		cy.get(myBoards.boardThreeTitle).should("contain", boards[2].name);
		cy.get(myBoards.boardFourTitle).should("contain", boards[3].name);
		cy.get("@stubbedBoards")
			.its("response")
			.then((intercept) => {
				//console.log(intercept);
				expect(intercept.body[0].name).to.eq(boards[0].name);
				expect(intercept.body[0].starred).to.eq(false);
				expect(intercept.body[1].name).to.eq(boards[1].name);
				expect(intercept.body[1].starred).to.eq(true);
				expect(intercept.body[2].name).to.eq(boards[2].name);
				expect(intercept.body[2].starred).to.eq(false);
				expect(intercept.body[3].name).to.eq(boards[3].name);
				expect(intercept.body[3].starred).to.eq(false);
			});
	});

	it("Assertation of the 'In QA' board", () => {
		cy.intercept("GET", "/api/boards/58271901456", { fixture: "qaBoard.json" }).as("qaBoard");
		cy.visit("/board/58271901456");
		cy.get("@qaBoard")
			.its("response")
			.then((intercept) => {
				// console.log(intercept);
				expect(intercept.body.name).to.eq(boards[2].name);
				expect(intercept.body.lists[0].title).to.eq(qaBoard.lists[0].title);
				expect(intercept.body.tasks[0].title).to.eq(qaBoard.tasks[0].title);
				expect(intercept.body.tasks[0].completed).to.eq(false);
				expect(intercept.body.tasks[1].title).to.eq(qaBoard.tasks[1].title);
				expect(intercept.body.tasks[1].completed).to.eq(true);
				expect(intercept.body.tasks[2].title).to.eq(qaBoard.tasks[2].title);
				expect(intercept.body.tasks[2].completed).to.eq(false);
			});
	});
});
