import { gql } from "graphql-request";

export const getPostBySlug = gql`
  query GetPostBySlug($id: ID!) {
    post(idType: SLUG, id: $id) {
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
`;

export const getCommentBySlug = gql`
  query GetCommentBySlug($id: ID!) {
    post(idType: SLUG, id: $id) {
      id
      slug
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
`;

export interface IPostDetail {
  post: Post;
}

interface Post {
  id: string;
  slug: string;
  comments: Comments;
}

interface Comments {
  nodes: Node2[];
}

interface Node2 {
  content: string;
  date: string;
  author: Author;
}

interface Author {
  node: Node;
}

interface Node {
  id: string;
  name: string;
}

// ---------------
export interface IGetPostComment {
  post: Post;
}

interface Post {
  id: string;
  slug: string;
  comments: Comments;
}

interface Comments {
  nodes: Node2[];
}

interface Node2 {
  content: string;
  date: string;
  author: Author;
}

interface Author {
  node: Node;
}

interface Node {
  id: string;
  name: string;
}
