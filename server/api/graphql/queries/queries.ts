import { ApolloServerContext } from "../../types/ApolloServerContext";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { BankType } from "../types/types";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bank: {
      type: BankType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_parent, args, ctx: ApolloServerContext) {
        return ctx.prisma.bank.findUnique({ where: { id: +args.id } });
      },
    },
    banks: {
      type: BankType,
      args: {
        skip: { type: new GraphQLNonNull(GraphQLInt) },
        take: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_parent, { skip, take }, ctx: ApolloServerContext) {
        return ctx.prisma.bank.findMany({
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    },
  },
});
