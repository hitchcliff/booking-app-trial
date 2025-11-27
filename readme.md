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
