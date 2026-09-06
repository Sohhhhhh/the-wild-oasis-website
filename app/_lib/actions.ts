'use server';

import { revalidatePath } from 'next/cache';

import { supabase } from '@/app/_lib/supabase';
import { auth, signIn, signOut } from '@/app/_lib/auth';

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('You must be  logged in');

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

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
