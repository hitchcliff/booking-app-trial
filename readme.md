# tech stuffs

## admin

- can create booking
- delete booking
- update booking
- read bookings
- read all users who applied to the booking

## users can add the booking

- set the appointment time
- delete the booking
- update the booking
- read all bookings in a list
- read scheduled bookings

### model:

#### booking model:

- id
- title
- body
- appointment time
- schedule
  - list of users and appointed time

### relationships

- admin can create many booking
- booking will be own by admin role
- user can `schedule` to many booking
- booking can be `schedule` by many users

### graphql schema

#### register

`mutation Register($options: RegisterInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      name
      email
      emailVerified
      dialCode
      phoneNumber
      acceptedTermsAndConditions
      role
      accountType
    }
  }
}`

#### login

`mutation Login($options: LoginInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
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
  }
}
`

### UpdateRole (admin role can update any users to admin) will not be implemented in the Frontend

`mutation UpdateRole($options: UpdateRoleInput!) {
  updateRole( options: $options) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      acceptedTermsAndConditions
      name
      email
      emailVerified
      role
      accountType
      dialCode
      phoneNumber
      picture
    }
  }
}`

#### Me

`query Me {
  me {
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
}
`
