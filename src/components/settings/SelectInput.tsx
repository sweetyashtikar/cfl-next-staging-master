import { useEffect, useRef, useState } from 'react';

import useCitySearch from '@/hooks/useCitySearch';

interface ItemProps {
  placeholder?: string;
  className?: string;
  selected?: any;
  setTheCity?: any;
}

export default function SelectInput({
  placeholder,
  className,
  selected,
  setTheCity,
}: ItemProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { data: cities, loading } = useCitySearch(searchText);
  const [showClose, setShowClose] = useState(false);
  const dropdown = useRef(null);
  const locRef = useRef(null);

  function handleClick(event: any) {
    //@ts-ignore
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setShowMessage(false);
    }
  }

  useEffect(() => {
    //@ts-ignore
    locRef.current.placeholder = selected?.label || '';
    //@ts-ignore
    if (locRef.current.placeholder) {
      setShowClose(true);
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [selected]);

  const selectCity = (city: any) => {
    setTheCity(city.id);
    //@ts-ignore
    locRef.current.value = city.regionCode
      ? city.name + ', ' + city.regionCode + ', ' + city.country
      : city.name + ', ' + city.country;
    setShowMessage(false);
    setShowClose(true);
  };

  const clearCity = () => {
    //@ts-ignore
    locRef.current.value = '';
    //@ts-ignore
    locRef.current.placeholder = '';
    setTheCity('');
    setShowClose(false);
  };

  const showData = () => {
    if (loading) {
      return (
        <div className="py-4 px-2 text-center text-sm text-gray-500">
          {'Loading...'}
        </div>
      );
    }
    return (
      <>
        {!cities
          ? 'City not found, please select the closest city to you'
          : cities
              .sort(function (a: any, b: any) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((c: any, index: number) => {
                return (
                  <div
                    key={'city_' + index}
                    className={'cursor-pointer p-2 text-sm hover:bg-blue-100'}
                    onClick={() => {
                      selectCity(c);
                    }}
                  >
                    {c.regionCode
                      ? `${c.name}, ${c.regionCode}, ${c.country}`
                      : `${c.name}, ${c.country}`}
                  </div>
                );
              })}
      </>
    );
  };

  return (
    <>
      <div className="relative" ref={dropdown}>
        <input
          ref={locRef}
          type={'text'}
          placeholder={placeholder}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
          }}
          className={className}
          onFocus={() => {
            setShowMessage(true);
          }}
        />
        <span
          className={
            'absolute right-3 top-2 cursor-pointer text-[#bbbbbb] hover:text-[#999999] ' +
            (showClose ? '' : 'hidden')
          }
          onClick={() => {
            clearCity();
          }}
        >
          x
        </span>
        <div
          className={
            showMessage == true
              ? 'absolute z-10 max-h-64 w-full overflow-auto bg-white shadow-md'
              : 'hidden'
          }
        >
          {searchText ? (
            showData()
          ) : (
            <div className="py-4 px-2 text-center text-sm text-gray-500">
              {'Start typing to search for a city'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
