import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { graphqlUrl } from '../config';

const link = createUploadLink({ uri: graphqlUrl });

export async function init() {
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
  return client;
}
