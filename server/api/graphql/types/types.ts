import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} from "graphql";

import { GraphQLDateTime } from "graphql-iso-date";
import { ApolloServerContext } from "../../types/ApolloServerContext";

export const BankType: GraphQLObjectType = new GraphQLObjectType({
  name: "Bank",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    interest_rate: { type: new GraphQLNonNull(GraphQLFloat) },
    max_loan: { type: new GraphQLNonNull(GraphQLInt) },
    min_down_pay: { type: new GraphQLNonNull(GraphQLInt) },
    loan_term: { type: new GraphQLNonNull(GraphQLInt) },
    history: {
      type: GraphQLList(HistoryType),
      args: { user: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parent, args, ctx: ApolloServerContext) {
        return ctx.prisma.history.findMany({
          where: { bankId: +parent.id, user: args.user },
        });
      },
    },
  }),
});

export const HistoryType: GraphQLObjectType = new GraphQLObjectType({
  name: "History",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    user: { type: new GraphQLNonNull(GraphQLString) },
    init_loan: { type: new GraphQLNonNull(GraphQLInt) },
    down_pay: { type: new GraphQLNonNull(GraphQLInt) },
    month_pay: { type: new GraphQLNonNull(GraphQLFloat) },
    bank: {
      type: BankType,
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.bank.findUnique({ where: { id: +parent.bankId } });
      },
    },
  }),
});
