describe("Create Boards and Assert Data", () => {
	it("Assertation of all boards", () => {
		cy.intercept("GET", "/api/boards", { fixture: "boards.json" }).as("stubbedBoards");
		cy.visit("/");
		cy.get("div:nth-of-type(1) > h1.board_title").should("contain", "To Do");
		cy.get("div:nth-of-type(2) > h1.board_title").should("contain", "In Progress");
		cy.get("div:nth-of-type(3) > h1.board_title").should("contain", "In QA");
		cy.get("div:nth-of-type(4) > h1.board_title").should("contain", "Done");
		cy.get("@stubbedBoards")
			.its("response")
			.then((intercept) => {
				//console.log(intercept);
				expect(intercept.body[0].name).to.eq("To Do");
				expect(intercept.body[0].starred).to.eq(false);
				expect(intercept.body[1].name).to.eq("In Progress");
				expect(intercept.body[1].starred).to.eq(true);
				expect(intercept.body[2].name).to.eq("In QA");
				expect(intercept.body[2].starred).to.eq(false);
				expect(intercept.body[3].name).to.eq("Done");
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
				expect(intercept.body.name).to.eq("In QA");
				expect(intercept.body.lists[0].title).to.eq("Tasks");
				expect(intercept.body.tasks[0].title).to.eq("Stubbing network responses");
				expect(intercept.body.tasks[0].completed).to.eq(false);
				expect(intercept.body.tasks[1].title).to.eq("Changing parts of response data");
				expect(intercept.body.tasks[1].completed).to.eq(true);
				expect(intercept.body.tasks[2].title).to.eq("Intercepting");
				expect(intercept.body.tasks[2].completed).to.eq(false);
			});
	});
});
