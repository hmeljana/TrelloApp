describe("Network stubbing", () => {
	// it("I can change network response", () => {
	// 	cy.intercept("/api/boards", { fixture: "board.json" }).as("fakeBoard");
	// 	cy.visit("/");
	// 	cy.get("[data-cy=board-item] > .board_title").should("have.text", "Izmenjen Board 1");
	// 	cy.wait("@fakeBoard").then((intercept) => {
	// 		console.log(intercept);
	// 		expect(intercept.response.statusCode).to.eq(200);
	// 		expect(intercept.response.body[0].name).to.eq("Izmenjen Board 1");
	// 	});
	// });
	// it("Dynamically change parts of the response data", () => {
	// 	cy.intercept(
	// 		{
	// 			method: "GET",
	// 			url: "/api/boards",
	// 		},
	// 		(req) => {
	// 			req.reply((res) => {
	// 				res.body[0].starred = true;
	// 				res.body[1].name = "Dinamicki promenjeno ime borda";
	// 				return res;
	// 			});
	// 		}
	// 	);
	// 	cy.visit("/");
	// });
	// it("Create new Board", () => {
	// 	cy.request("POST", "/api/boards", {
	// 		statusCode: 201,
	// 		name: "NovokreiraniB",
	// 	});
	// 	cy.visit("/");
	// });
	// it("Create new Board", () => {
	// 	cy.request("POST", "/api/boards", {
	// 		statusCode: 201,
	// 		name: "NB",
	// 	});
	// 	cy.visit("/");
	// });
	// it("Delete new Board", () => {
	// 	cy.request("DELETE", "/api/boards", {
	// 		statusCode: 204,
	// 	});
	// 	cy.visit("/");
	// });
});
