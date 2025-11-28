import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Appointment = {
  __typename?: 'Appointment';
  booking?: Maybe<Booking>;
  date: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  to: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type AppointmentResponse = {
  __typename?: 'AppointmentResponse';
  appointment?: Maybe<Appointment>;
  errors?: Maybe<Array<FieldError>>;
};

export type Booking = {
  __typename?: 'Booking';
  appointments?: Maybe<Array<Appointment>>;
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user?: Maybe<User>;
};

export type BookingResponse = {
  __typename?: 'BookingResponse';
  booking?: Maybe<Booking>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateAppointmentInput = {
  date: Scalars['String']['input'];
  from: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  to: Scalars['String']['input'];
};

export type CreateBookingInput = {
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment: AppointmentResponse;
  createBooking: BookingResponse;
  deleteAllAppointments: Scalars['Boolean']['output'];
  deleteAllBookings: Scalars['Boolean']['output'];
  deleteAppointmentById: Scalars['Boolean']['output'];
  deleteBookingById: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updateRole: UserResponse;
};


export type MutationCreateAppointmentArgs = {
  options: CreateAppointmentInput;
};


export type MutationCreateBookingArgs = {
  options: CreateBookingInput;
};


export type MutationDeleteAppointmentByIdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteBookingByIdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationUpdateRoleArgs = {
  options: UpdateRoleInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  readAllAppointments: Array<Appointment>;
  readAllBookings: Array<Booking>;
  readAllMyAppointments?: Maybe<Array<Appointment>>;
  readAppointmentsByBookingId?: Maybe<Array<Appointment>>;
  readBookingById?: Maybe<Booking>;
};


export type QueryReadAppointmentsByBookingIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryReadBookingByIdArgs = {
  id: Scalars['Float']['input'];
};

export type RegisterInput = {
  acceptedTermsAndConditions: Scalars['Boolean']['input'];
  accountType: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
  dialCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type UpdateRoleInput = {
  role: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  acceptedTermsAndConditions: Scalars['Boolean']['output'];
  accountType: Scalars['String']['output'];
  appointments?: Maybe<Array<Appointment>>;
  bookings?: Maybe<Array<Booking>>;
  createdAt: Scalars['DateTimeISO']['output'];
  dialCode: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AppointmentFragment = { __typename?: 'Appointment', id: number, date: string, from: string, to: string };

export type AppointmentResponseFragment = { __typename?: 'AppointmentResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, appointment?: { __typename?: 'Appointment', id: number, date: string, from: string, to: string } | null };

export type BookingFragment = { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string };

export type BookingResponseFragment = { __typename?: 'BookingResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, booking?: { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null, appointments?: Array<{ __typename?: 'Appointment', id: number, date: string, from: string, to: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null, booking?: { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string } | null }> | null } | null };

export type FieldErrorFragment = { __typename?: 'FieldError', field?: string | null, message?: string | null };

export type UserFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string };

export type UserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null };

export type CreateAppointmentMutationVariables = Exact<{
  options: CreateAppointmentInput;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'AppointmentResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, appointment?: { __typename?: 'Appointment', id: number, date: string, from: string, to: string } | null } };

export type CreateBookingMutationVariables = Exact<{
  options: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'BookingResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, booking?: { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null, appointments?: Array<{ __typename?: 'Appointment', id: number, date: string, from: string, to: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null, booking?: { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string } | null }> | null } | null } };

export type DeleteAllAppointmentsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllAppointmentsMutation = { __typename?: 'Mutation', deleteAllAppointments: boolean };

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null };

export type ReadAllAppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadAllAppointmentsQuery = { __typename?: 'Query', readAllAppointments: Array<{ __typename?: 'Appointment', id: number, date: string, from: string, to: string, booking?: { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string } | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null }> };

export type ReadAllBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadAllBookingsQuery = { __typename?: 'Query', readAllBookings: Array<{ __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null, appointments?: Array<{ __typename?: 'Appointment', id: number, date: string, from: string, to: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null }> | null }> };

export type ReadAllMyAppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadAllMyAppointmentsQuery = { __typename?: 'Query', readAllMyAppointments?: Array<{ __typename?: 'Appointment', id: number, date: string, from: string, to: string, booking?: { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null } | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null }> | null };

export type ReadBookingByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type ReadBookingByIdQuery = { __typename?: 'Query', readBookingById?: { __typename?: 'Booking', id: number, createdAt: any, updatedAt: any, body: string, title: string, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, emailVerified: boolean, dialCode: string, phoneNumber: string, acceptedTermsAndConditions: boolean, picture?: string | null, role: string, accountType: string } | null } | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query",
      "kind": "OBJECT"
    },
    "mutationType": {
      "name": "Mutation",
      "kind": "OBJECT"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Appointment",
        "fields": [
          {
            "name": "booking",
            "type": {
              "kind": "OBJECT",
              "name": "Booking",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "to",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AppointmentResponse",
        "fields": [
          {
            "name": "appointment",
            "type": {
              "kind": "OBJECT",
              "name": "Appointment",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Booking",
        "fields": [
          {
            "name": "appointments",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Appointment",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "body",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookingResponse",
        "fields": [
          {
            "name": "booking",
            "type": {
              "kind": "OBJECT",
              "name": "Booking",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FieldError",
        "fields": [
          {
            "name": "field",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "message",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "createAppointment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AppointmentResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createBooking",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookingResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "deleteAllAppointments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deleteAllBookings",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deleteAppointmentById",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "deleteBookingById",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "login",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "logout",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "register",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateRole",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "readAllAppointments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Appointment",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "readAllBookings",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Booking",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "readAllMyAppointments",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Appointment",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "readAppointmentsByBookingId",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Appointment",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "readBookingById",
            "type": {
              "kind": "OBJECT",
              "name": "Booking",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "acceptedTermsAndConditions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "accountType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "appointments",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Appointment",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "bookings",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Booking",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "dialCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "emailVerified",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "phoneNumber",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "picture",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "role",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserResponse",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;
export const FieldErrorFragmentDoc = gql`
    fragment FieldError on FieldError {
  field
  message
}
    `;
export const AppointmentFragmentDoc = gql`
    fragment Appointment on Appointment {
  id
  date
  from
  to
}
    `;
export const AppointmentResponseFragmentDoc = gql`
    fragment AppointmentResponse on AppointmentResponse {
  errors {
    ...FieldError
  }
  appointment {
    ...Appointment
  }
}
    ${FieldErrorFragmentDoc}
${AppointmentFragmentDoc}`;
export const BookingFragmentDoc = gql`
    fragment Booking on Booking {
  id
  createdAt
  updatedAt
  body
  title
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  createdAt
  updatedAt
  name
  email
  emailVerified
  dialCode
  phoneNumber
  acceptedTermsAndConditions
  picture
  role
  accountType
}
    `;
export const BookingResponseFragmentDoc = gql`
    fragment BookingResponse on BookingResponse {
  errors {
    ...FieldError
  }
  booking {
    ...Booking
    user {
      ...User
    }
    appointments {
      ...Appointment
      user {
        ...User
      }
      booking {
        ...Booking
      }
    }
  }
}
    ${FieldErrorFragmentDoc}
${BookingFragmentDoc}
${UserFragmentDoc}
${AppointmentFragmentDoc}`;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    ...FieldError
  }
  user {
    ...User
  }
}
    ${FieldErrorFragmentDoc}
${UserFragmentDoc}`;
export const CreateAppointmentDocument = gql`
    mutation CreateAppointment($options: CreateAppointmentInput!) {
  createAppointment(options: $options) {
    errors {
      ...FieldError
    }
    appointment {
      ...Appointment
    }
  }
}
    ${FieldErrorFragmentDoc}
${AppointmentFragmentDoc}`;

export function useCreateAppointmentMutation() {
  return Urql.useMutation<CreateAppointmentMutation, CreateAppointmentMutationVariables>(CreateAppointmentDocument);
};
export const CreateBookingDocument = gql`
    mutation CreateBooking($options: CreateBookingInput!) {
  createBooking(options: $options) {
    ...BookingResponse
  }
}
    ${BookingResponseFragmentDoc}`;

export function useCreateBookingMutation() {
  return Urql.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument);
};
export const DeleteAllAppointmentsDocument = gql`
    mutation DeleteAllAppointments {
  deleteAllAppointments
}
    `;

export function useDeleteAllAppointmentsMutation() {
  return Urql.useMutation<DeleteAllAppointmentsMutation, DeleteAllAppointmentsMutationVariables>(DeleteAllAppointmentsDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const ReadAllAppointmentsDocument = gql`
    query ReadAllAppointments {
  readAllAppointments {
    ...Appointment
    booking {
      ...Booking
    }
    user {
      ...User
    }
  }
}
    ${AppointmentFragmentDoc}
${BookingFragmentDoc}
${UserFragmentDoc}`;

export function useReadAllAppointmentsQuery(options?: Omit<Urql.UseQueryArgs<ReadAllAppointmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllAppointmentsQuery, ReadAllAppointmentsQueryVariables>({ query: ReadAllAppointmentsDocument, ...options });
};
export const ReadAllBookingsDocument = gql`
    query ReadAllBookings {
  readAllBookings {
    ...Booking
    user {
      ...User
    }
    appointments {
      ...Appointment
      user {
        ...User
      }
    }
  }
}
    ${BookingFragmentDoc}
${UserFragmentDoc}
${AppointmentFragmentDoc}`;

export function useReadAllBookingsQuery(options?: Omit<Urql.UseQueryArgs<ReadAllBookingsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllBookingsQuery, ReadAllBookingsQueryVariables>({ query: ReadAllBookingsDocument, ...options });
};
export const ReadAllMyAppointmentsDocument = gql`
    query ReadAllMyAppointments {
  readAllMyAppointments {
    ...Appointment
    booking {
      ...Booking
      user {
        ...User
      }
    }
    user {
      ...User
    }
  }
}
    ${AppointmentFragmentDoc}
${BookingFragmentDoc}
${UserFragmentDoc}`;

export function useReadAllMyAppointmentsQuery(options?: Omit<Urql.UseQueryArgs<ReadAllMyAppointmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllMyAppointmentsQuery, ReadAllMyAppointmentsQueryVariables>({ query: ReadAllMyAppointmentsDocument, ...options });
};
export const ReadBookingByIdDocument = gql`
    query ReadBookingById($id: Float!) {
  readBookingById(id: $id) {
    ...Booking
    user {
      ...User
    }
  }
}
    ${BookingFragmentDoc}
${UserFragmentDoc}`;

export function useReadBookingByIdQuery(options: Omit<Urql.UseQueryArgs<ReadBookingByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadBookingByIdQuery, ReadBookingByIdQueryVariables>({ query: ReadBookingByIdDocument, ...options });
};