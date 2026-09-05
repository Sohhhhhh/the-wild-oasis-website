import { auth } from '@/app/_lib/auth';
import { Cabin } from '@/app/_types';
import DateSelector from '@/app/_components/DateSelector';
import LoginMessage from '@/app/_components/LoginMessage';
import ReservationForm from '@/app/_components/ReservationForm';
import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';

async function Reservation({ cabin }: { cabin: Cabin }) {
  const session = await auth();

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-100`'>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}{' '}
    </div>
  );
}

export default Reservation;
