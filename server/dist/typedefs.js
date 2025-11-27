"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
    scalar Upload

    type Mutation {
    uploadFile(file: Upload!): String
  }
`;
