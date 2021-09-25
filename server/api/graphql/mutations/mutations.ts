import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { ApolloServerContext } from "../../types/ApolloServerContext";
import { GraphQLUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBank: {
      type: GraphQLBoolean,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLUpload },
        interest_rate: { type: new GraphQLNonNull(GraphQLFloat) },
        max_loan: { type: new GraphQLNonNull(GraphQLInt) },
        min_down_pay: { type: new GraphQLNonNull(GraphQLInt) },
        loan_term: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        try {
          let imageName: string = "";
          if (args.image) {
            const { filename, createReadStream } = await args.image;
            imageName = uuidv4() + filename;

            await new Promise((res) =>
              createReadStream()
                .pipe(
                  ctx.googleBucket.file(imageName).createWriteStream({
                    resumable: false,
                    gzip: true,
                  })
                )
                .on("finish", res)
            );
          }
          await ctx.prisma.bank.create({
            data: {
              name: args.name,
              interest_rate: args.interest_rate,
              max_loan: args.max_loan,
              min_down_pay: args.min_down_pay,
              loan_term: args.loan_term,
              image: imageName,
            },
          });

          return true;
        } catch (e) {
          return false;
        }
      },
    },
    changeBank: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        image: { type: GraphQLUpload },
        interest_rate: { type: GraphQLFloat },
        max_loan: { type: GraphQLInt },
        min_down_pay: { type: GraphQLInt },
        loan_term: { type: GraphQLInt },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        try {
          let imageName: string | undefined = undefined;
          if (args.image) {
            const { filename, createReadStream } = await args.image;
            imageName = uuidv4() + filename;

            await new Promise((res) =>
              createReadStream()
                .pipe(
                  ctx.googleBucket.file(imageName as string).createWriteStream({
                    resumable: false,
                    gzip: true,
                  })
                )
                .on("finish", res)
            );

            const oldImage = await ctx.prisma.bank
              .findUnique({
                where: {
                  id: +args.id,
                },
              })
              .then((b) => b?.image);

            oldImage &&
              ctx.googleBucket.file(oldImage) &&
              (await ctx.googleBucket.file(oldImage).delete());
          }

          await ctx.prisma.bank.update({
            where: {
              id: +args.id,
            },
            data: {
              name: args.name,
              interest_rate: args.interest_rate,
              max_loan: args.max_loan,
              min_down_pay: args.min_down_pay,
              loan_term: args.loan_term,
              image: imageName,
            },
          });

          return true;
        } catch (e) {
          return false;
        }
      },
    },
    deleteBank: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        try {
          const imageName = await ctx.prisma.bank
            .findUnique({
              where: {
                id: +id,
              },
            })
            .then((b) => b?.image);

          imageName &&
            ctx.googleBucket.file(imageName) &&
            (await ctx.googleBucket.file(imageName).delete());

          await ctx.prisma.bank.delete({ where: { id: +id } });

          return true;
        } catch (e) {
          return false;
        }
      },
    },
    addHistory: {
      type: GraphQLBoolean,
      args: {
        user: { type: new GraphQLNonNull(GraphQLString) },
        init_loan: { type: new GraphQLNonNull(GraphQLInt) },
        down_pay: { type: new GraphQLNonNull(GraphQLInt) },
        month_pay: { type: new GraphQLNonNull(GraphQLFloat) },
        bankId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        try {
          await ctx.prisma.history.create({
            data: {
              user: args.user,
              init_loan: args.init_loan,
              down_pay: args.down_pay,
              month_pay: args.month_pay,
              bankId: +args.bankId,
            },
          });
          return true;
        } catch (e) {
          return false;
        }
      },
    },
    deleteHistories: {
      type: GraphQLBoolean,
      args: {
        user: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, { user }, ctx: ApolloServerContext) {
        try {
          await ctx.prisma.history.deleteMany({
            where: {
              user: user,
            },
          });
          return true;
        } catch (e) {
          return false;
        }
      },
    },
  },
});
