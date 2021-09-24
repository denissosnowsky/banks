import {
  GraphQLSchema
} from "graphql";
import { Mutation } from "../mutations/mutations";
import { RootQuery } from "../queries/queries";

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
