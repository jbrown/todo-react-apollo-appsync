[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/jbrown/todo-react-apollo-appsync)

## About

This is the app I wish I had found when I was first learning React, Apollo, GraphQL, and AppSync. It's a little more advanced than the basic todo examples you'll find in most blog posts.

## Install

The backend runs on [AWS Amplify](https://aws-amplify.github.io/docs/). You'll need to install the cli utility and configure it with your AWS account credentials. Then just tell it to `push` and the backend will be deployed for you automatically.

```shell
$ npm install -g @aws-amplify/cli
$ amplify configure
$ amplify push
```

Install your dependencies and start the local React server.

```shell
$ yarn
$ yarn start
```

## Repository Design

The components are organized into two main directories, `/features` and `/components`. Feature directories contain the component hierarchies and code related to a specific feature of the application while any components that are used by more than one feature live in the `/components` directory. Inside a feature directory, the directory structure mimics the component hierarchy. This sets a convention which makes it easier to reason about import statements and component names.

```
/features/List/index.js
/features/List/Sidebar/index.js
/features/List/Sidebar/Item/index.js
```

```javascript
// features/List/index.js
export * from "./Sidebar";
```

```javascript
// features/List/Sidebar/index.js
import { filter } from "graphql-anywhere";
import { ListSidebarItem } from "./Item";

export const ListSidebar = ({ items }) => (
  items.map(list => <ListSidebarItem {...filter(ListSidebarItem.fragment, list)} />)
);

ListSidebar.fragment = gql`
  fragment ListSidebarFragment on ListConnection {
    items {
      ...ListSidebarItemFragment
    }
    nextToken
  }
  ${ListSidebarItem.fragment}
`;

export const sidebarQuery = gql`
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      ...ListSidebarFragment
    }
  }
  ${ListSidebar.fragment}
`;
```

```javascript
// features/List/Sidebar/Item/index.js
export const ListSidebarItem = ({ id, name }) => <div>{name}</div>;

ListSidebarItem.fragment = gql`
  fragment ListSidebarItemFragment on List {
    id
    name
  }
`;
```

**Conventions:**

- Components that display data define a graphql fragment for those fields and expose it as the `fragment` property on the component. These fragments are composed up the hierarchy and eventually used inside a query definition. When rendering down the hierarchy, the `filter` helper from `graphql-anywhere` is used to pass exactly the attributes each component expects.
- Components are named after their path in the directory structure. e.g. `/features/List/Sidebar/Item` should be named `ListSidebarItem`
- Queries live with the components that consume them, they should also be composed of the fragments for the subcomponents that will display the resulting data.

**Rules:**

1. Components in the `/components` directory may not import any code from the `/features` directory.
2. Components in the `/features` directory may import code from any subdirectories, but not from parent directories.

### Other Considerations

Throughout the project named exports are used instead of default exports simply because it maintains naming consistency in import statements. In the future, any refactoring involving naming will be much easier.

## Deployment

This is an AWS Amplify app and I personally deploy it using the Amplify Console CD service.
