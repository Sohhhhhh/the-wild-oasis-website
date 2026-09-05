import { Suspense } from 'react';

import Cabin from '@/app/_components/Cabin';
import Spinner from '@/app/_components/Spinner';
import Reservation from '@/app/_components/Reservation';
import { getCabin, getCabins } from '@/app/_lib/data-service';

type Params = { cabinId: number };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { name } = await getCabin((await params).cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const cabin = await getCabin((await params).cabinId);

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
