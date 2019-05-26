import {
  deferred,
  jsonOk,
  matchGraphqlOperation,
  mockList,
  mockTaskConnection
} from "../support";

describe("The sidebar", function() {
  let fetchStub;
  let fetchListsDeferred;

  beforeEach(function() {
    fetchListsDeferred = deferred();
    cy.visit("/", {
      onBeforeLoad: win => {
        fetchStub = cy.stub(win, "fetch");
        fetchStub
          .withArgs(
            Cypress.sinon.match("graphql"),
            Cypress.sinon.match(matchGraphqlOperation("ListLists"))
          )
          .as("fetchLists")
          .returns(fetchListsDeferred.promise);
      }
    });
  });

  describe("while the lists are loading", function() {
    it("display a loading indicator while fetching lists", function() {
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
          listLists: {
            items: [
              mockList({ name: "One" }),
              mockList({ name: "Two" }),
              mockList({ name: "Three" })
            ],
            nextToken: null,
            __typename: "ModelListConnection"
          }
        }
      };
      fetchListsDeferred.resolve(jsonOk(mock));
    });

    it("displays the users lists", function() {
      cy.get(".ListSidebarItem__name").should($items => {
        let texts = $items.map((i, el) => Cypress.$(el).text());

        expect(texts.get()).to.deep.eq(["One", "Two", "Three"]);
      });
    });

    it("allows creating a new list", function() {
      fetchStub
        .withArgs(
          Cypress.sinon.match("graphql"),
          Cypress.sinon.match(matchGraphqlOperation("CreateList"))
        )
        .as("createList")
        .returns(
          Promise.resolve(
            jsonOk({
              data: {
                createList: {
                  id: "123",
                  name: "foo",
                  tasks: mockTaskConnection(),
                  __typename: "List"
                }
              }
            })
          )
        );

      cy.get("[data-test-id='new-list-btn']").click();

      // TODO: form is visible

      cy.get("[data-test-id='new-list-form']").within(() => {
        cy.root()
          .find("input")
          .type("foo");
        cy.root()
          .contains("Add")
          .click();
      });

      // TODO: form is hidden

      cy.get(".ListSidebarItem__name").should($items => {
        let texts = $items.map((i, el) => Cypress.$(el).text());

        expect(texts.get()).to.deep.eq(["One", "Two", "Three", "foo"]);
      });
    });
  });
});
