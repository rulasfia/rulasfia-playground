import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { fetcher } from "../utils/graphql";
import { getAllPost, IAllPost } from "../utils/queries/getAllPost";

export const getStaticProps = async () => {
  const blogs = await fetcher<IAllPost>({
    query: getAllPost,
  });

  return {
    props: {
      blogs: blogs.posts.edges,
    },
  };
};

const BlogPage = ({
  blogs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div style={{ padding: "1rem" }}>
      <h3>All Posts</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.node.id}>
            <Link href={`/blog/${blog.node.slug}`} passHref>
              <a>{blog.node.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <br />

      <hr />
      <h3>Raw Data</h3>
      <pre>{JSON.stringify(blogs, null, 4)}</pre>
    </div>
  );
};

export default BlogPage;
