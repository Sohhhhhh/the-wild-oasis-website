'use client';
import { useOptimistic } from 'react';

import { BookingSumm } from '@/app/_types';
import { deleteBooking } from '@/app/_lib/actions';
import ReservationCard from '@/app/_components/ReservationCard';

function ReservationList({ bookings }: { bookings: BookingSumm[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
