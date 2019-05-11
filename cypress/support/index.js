import uuidV4 from "uuid/v4";

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const deferred = () => {
  const deferred = {};
  /* global Promise */
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

export const matchGraphqlOperation = name => {
  return value => {
    let body = JSON.parse(value.body);
    return body.operationName === name;
  };
};

export const jsonOk = body => {
  var mockResponse = new window.Response(JSON.stringify(body), {
    //the fetch API returns a resolved window Response object
    status: 200,
    headers: {
      "Content-type": "application/json"
    }
  });

  return Promise.resolve(mockResponse);
};

function createMockFactory(__typename, defaults) {
  return params =>
    Object.assign(
      {
        __typename
      },
      defaults(),
      params
    );
}

export const mockCommentConnection = createMockFactory(
  "ModelCommentConnection",
  () => ({
    items: [],
    nextToken: null
  })
);
export const mockTaskConnection = createMockFactory(
  "ModelTaskConnection",
  () => ({
    items: [],
    nextToken: null
  })
);
export const mockList = createMockFactory("List", () => ({
  id: uuidV4(),
  name: "Test",
  tasks: mockTaskConnection()
}));

export const mockTask = createMockFactory("Task", () => ({
  id: uuidV4(),
  name: "Test",
  completed: false,
  createdAt: "123",
  updatedAt: "123",
  tags: [],
  version: 1,
  list: null,
  priority: null,
  comments: mockCommentConnection()
}));
