import { GraphQLClient } from "graphql-request";

export const gqlcms = new GraphQLClient(
  "http://localhost/organify-blog/wordpress/graphql"
);

type FetcherParams = {
  query: string;
  where?: object;
};

export async function fetcher<Type>(params: FetcherParams): Promise<Type> {
  if (!!params.where) return await gqlcms.request(params.query, params.where);

  return await gqlcms.request(params.query);
}
