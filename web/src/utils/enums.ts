export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum UserAccountType {
  BOOKER = "booker",
  AGENT = "agent",
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
}
