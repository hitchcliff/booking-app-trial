import Booking from "../entities/Booking";

interface hasPostProps {
  id: number;
}

export default async function getBooking({
  id,
}: hasPostProps): Promise<Booking | null> {
  const booking = await Booking.findOne({
    where: {
      id,
    },
  });

  return booking;
}
