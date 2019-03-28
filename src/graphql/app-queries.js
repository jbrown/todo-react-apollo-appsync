export const getList = `query GetList($id: ID!) {
  getList(id: $id) {
    id
    name
    createdAt
    updatedAt
    tasks {
      items {
        id
        name
        completed
        createdAt
        updatedAt
        list {
          id
          name
          createdAt
          updatedAt
          version
        }
        comments {
          nextToken
        }
        version
      }
      nextToken
    }
    version
  }
}
`;
