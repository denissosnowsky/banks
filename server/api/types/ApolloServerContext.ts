import { Bucket } from "@google-cloud/storage";
import { PrismaClient } from "@prisma/client";
import express from "express";

export interface ReqResExpress {
  req: express.Request;
  res: express.Response;
}

export interface ApolloServerContext extends ReqResExpress {
  prisma: PrismaClient;
  googleBucket: Bucket;
}
