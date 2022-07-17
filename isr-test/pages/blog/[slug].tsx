import { useRouter } from "next/router";
import { fetcher, gqlcms } from "@utils/graphql";
import { getAllSlugs } from "@utils/queries/getAllPost";
import {
  getCommentBySlug,
  getPostBySlug,
  IPostDetail,
  IGetPostComment,
} from "@utils/queries/getPostDetail";
import styles from "../../styles/typography.module.css";

export const getStaticPaths = async () => {
  const posts = await gqlcms.request(getAllSlugs);

  return {
    paths: posts.posts.edges.map((edge) => ({
      params: { slug: edge.node.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  // const blog = await gqlcms.request(getPostBySlug, { id: params.slug });
  const blog = await fetcher<IPostDetail>({
    query: getPostBySlug,
    where: { id: params.slug },
  });
  const comment = await fetcher<IGetPostComment>({
    query: getCommentBySlug,
    where: { id: params.slug },
  });

  return {
    props: {
      blog: blog.post,
      comment: comment.post.comments.nodes,
    },
  };
};

const BlogDetailPage = ({ blog, comment }) => {
  return (
    <div style={{ padding: "2rem 6rem" }}>
      <h1>{blog.title}</h1>
      <div
        className={`${styles.prose} ${styles["prose-lg"]}`}
        dangerouslySetInnerHTML={{ __html: blog.content as string }}
      />
      <hr />
      <h3>Raw Data</h3>
      <pre>{JSON.stringify(blog, null, 4)}</pre>
      <br />
      <pre>{JSON.stringify(comment, null, 4)}</pre>
    </div>
  );
};

export default BlogDetailPage;
