import { registerEnumType } from "type-graphql";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum UserAccountType {
  BOOKER = "booker",
  AGENT = "agent",
  SELLER = "seller",
}

export enum FieldInput {
  ID = "id",
  UID = "uid",
  OPTIONS = "options",
  TITLE = "title",
  BODY = "body",
  DATE = "date",
  TIME = "time",
  FROM = "from",
  TO = "to",
  VALUE = "value",
}

export enum FieldMessage {
  REQUIRED = "required",
  NOT_BOOKER = "not a booker",
  DUPLICATE = "duplicate",
  NOT_AVAILABLE = "not available",
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "User roles",
});

registerEnumType(UserAccountType, {
  name: "UserAccountType",
  description: "Account type for users",
});

registerEnumType(FieldInput, {
  name: "FieldInput",
  description: "Field input strings",
});
