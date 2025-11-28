# tech stuffs

# How to run

1. Create DATABASE and name it `booking-test`
2. cd to `./server` then run `yarn dev` make sure to run `yarn install` first to install deps
3. cd to `./web` then run `yarn dev` make sure to run `yarn install` first to install the deps

# Accounts

1. admin account:

- email: admin@email.com pw:123456
- email: user@email.com pw:123456
- email: user2@email.com pw:123456

P.S. If you encounter database errors which usually happen when `postgres` is not installed in your local.
you can use the postgres database in vscode :)

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

### relationships

<!-- one to many and many to one -->

- admin can create many booking
- booking will be own by admin role

<!-- many to many -->
<!-- user <-> booking -->
<!-- user -> appointment <- booking -->

`appointment` act as the @JoinTable

- booking can `appoint` by many users
- users can `appoint` many bookings

### Note:

P.S. graphql schema has introspection enabled at `http://localhost:4000/graphql`
