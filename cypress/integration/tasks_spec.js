import {
  deferred,
  jsonOk,
  matchGraphqlOperation,
  mockList,
  mockTask,
  mockTaskConnection,
  mockCommentConnection
} from "../support";

describe("List detail", function() {
  let fetchStub;
  let fetchListDetailDeferred;

  beforeEach(function() {
    fetchListDetailDeferred = deferred();
    cy.visit("/", {
      onBeforeLoad: win => {
        fetchStub = cy.stub(win, "fetch");
        fetchStub
          .withArgs(
            Cypress.sinon.match("graphql"),
            Cypress.sinon.match(matchGraphqlOperation("ListLists"))
          )
          .as("fetchLists")
          .returns(
            Promise.resolve(
              jsonOk({
                data: {
                  listLists: {
                    items: [mockList({ id: "123", name: "One" })],
                    nextToken: null,
                    __typename: "ModelListConnection"
                  }
                }
              })
            )
          );
        fetchStub
          .withArgs(
            Cypress.sinon.match("graphql"),
            Cypress.sinon.match(matchGraphqlOperation("GetList"))
          )
          .as("fetchListDetail")
          .returns(fetchListDetailDeferred.promise);
      }
    });
  });

  describe("while the list is loading", function() {
    it("display a loading indicator while fetching the list", function() {
      let mock = {
        data: {
          getList: {
            id: "123",
            tasks: mockTaskConnection({
              items: [mockTask({ name: "Task One" })]
            }),
            __typename: "List"
          }
        }
      };
      fetchListDetailDeferred.resolve(jsonOk(mock));
      cy.contains("Loading...");
    });
  });

  describe("when list fetching fails", function() {
    it("display an error");
  });

  describe("when list fetching succeeds", function() {
    beforeEach(function() {
      let mock = {
        data: {
          getList: {
            id: "123",
            tasks: mockTaskConnection({
              items: [
                mockTask({ name: "Task One" }),
                mockTask({ name: "Task Two" }),
                mockTask({ name: "Task Three" })
              ]
            }),
            __typename: "List"
          }
        }
      };
      fetchListDetailDeferred.resolve(jsonOk(mock));
    });

    it("displays the tasks", function() {
      cy.get("[data-test-id='task-list-item']").should($items => {
        let texts = $items.map((i, el) => Cypress.$(el).text());

        expect(texts.get()).to.deep.eq(["Task One", "Task Two", "Task Three"]);
      });
    });

    it("allows creating a new task", function() {
      fetchStub
        .withArgs(
          Cypress.sinon.match("graphql"),
          Cypress.sinon.match(matchGraphqlOperation("CreateTask"))
        )
        .as("createTask")
        .returns(
          Promise.resolve(
            jsonOk({
              data: {
                createTask: {
                  id: "456",
                  name: "Task Four",
                  completed: false,
                  priority: null,
                  createdAt: null,
                  updatedAt: null,
                  tags: [],
                  version: 1,
                  comments: mockCommentConnection(),
                  list: mockList({ id: "123" }),
                  __typename: "Task"
                }
              }
            })
          )
        );

      cy.get("[data-test-id='new-task-form']").within(() => {
        cy.root()
          .find("input")
          .type("Task Four");
        cy.root()
          .contains("Add")
          .click();
      });

      cy.get("[data-test-id='task-list-item']").should($items => {
        let texts = $items.map((i, el) => Cypress.$(el).text());

        expect(texts.get()).to.deep.eq([
          "Task One",
          "Task Two",
          "Task Three",
          "Task Four"
        ]);
      });
    });
  });
});
