import { gql } from "graphql-request";

export const getAllPost = gql`
  query GetAllPost {
    posts {
      edges {
        node {
          id
          title
          slug
          author {
            node {
              id
              name
            }
          }
          date
          content
          featuredImage {
            node {
              id
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const getAllSlugs = gql`
  query GetAllSlug {
    posts {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`;

export const getAllComment = gql`
  query GetAllComment {
    posts {
      edges {
        node {
          id
          comments {
            nodes {
              content
              date
              author {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export interface IAllPost {
  posts: Posts;
}

interface Posts {
  edges: Edge[];
}

interface Edge {
  node: Node3;
}

interface Node3 {
  id: string;
  title: string;
  slug: string;
  author: Author;
  date: string;
  content: string;
  featuredImage?: FeaturedImage;
}

interface FeaturedImage {
  node: Node2;
}

interface Node2 {
  id: string;
  sourceUrl: string;
}

interface Author {
  node: Node;
}

interface Node {
  id: string;
  name: string;
}
