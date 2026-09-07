'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { supabase } from '@/app/_lib/supabase';
import { getBookings } from '@/app/_lib/data-service';
import { auth, signIn, signOut } from '@/app/_lib/auth';

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const nationalID = String(formData.get('nationalID'));
  const [nationality, countryFlag] = String(formData.get('nationality')).split(
    '%',
  );

  if (!/^[a-zA-Z0-9]{6,14}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updateDate = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from('guests')
    .update(updateDate)
    .eq('id', session.user!.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function createBooking(bookingData: any, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: +formData.get('numGuests')!,
    observations: formData.get('observations')?.slice(0, 1000) ?? '',
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) throw new Error('Booking could not be created');

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session!.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session!.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  const updateData = {
    numGuests: +formData.get('numGuests')!,
    observations: formData.get('observations')?.slice(0, 1000),
  };

  const bookingId = formData.get('bookingId')!;

  if (!guestBookingsIds.includes(+bookingId))
    throw new Error('You are not allowed to update this booking');

  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw new Error('Booking could not be updated');

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');

  redirect('/account/reservations');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
