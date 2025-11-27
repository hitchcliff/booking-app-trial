import { registerEnumType } from "type-graphql";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum UserAccountType {
  BUYER = "buyer",
  SELLER = "seller",
}

export enum FieldInput {
  ID = "id",
  UID = "uid",
  IMG = "img",
  OPTIONS = "options",
  CATEGORY_NAME = "name",
  CATEGORY_IMAGE = "image",
  UPDATE_CATEGORY = "update_category",
  BANNER_IMAGE = "upload_image",
  FILE_IMG = "file_img",
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