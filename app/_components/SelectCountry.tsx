import { getCountries } from '@/app/_lib/data-service';
import { Country, FixedCountry } from '@/app/_types';

// Let's imagine your colleague already built this component 😃

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}) {
  const countries = await getCountries();
  const flag =
    countries.find((c: Country) => c.name.common === defaultCountry)?.flag ??
    '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c: Country) => (
        <option key={c.name.common} value={`${c.name.common}%${c.flag}`}>
          {c.name.common}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
