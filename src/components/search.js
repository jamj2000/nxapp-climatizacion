'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';

function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();

  
  const handleSearch = useDebouncedCallback((text) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set('query', text);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)


  return (
    <div className="text-right">
    <input
      type='search'
      className={`text-black p-2 pl-10 rounded-full my-5 
      bg-[url('/lupa.svg')] bg-[length:16px_16px] bg-[center_left_10px] bg-no-repeat focus:outline-blue-300`}
      placeholder={'Buscar por nombre...'}
      onChange={(e) => handleSearch(e.target.value) }
      defaultValue={searchParams.get('query')?.toString()}
    />
  </div>

  )
}

export default Search