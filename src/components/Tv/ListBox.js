import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { AiFillCheckCircle, AiFillDownCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { fetchTv, filterTvBy } from '../../features/tv/tvSlice';

const category = [
  { cate: 'Popular' },
  { cate: 'Top Rated' },
  { cate: 'On The Air' },
  { cate: 'Airing Today' },
];

export default function ListBoxTv() {
  const [selected, setSelected] = useState(category[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterTvBy(selected));
    dispatch(
      fetchTv({ type: selected.cate.toLowerCase().split(' ').join('_') })
    );
  }, [dispatch, selected]);

  return (
    <div className="relative z-10 w-fit">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-[160px] cursor-default rounded-lg bg-darkRed py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-darkRed sm:text-sm text-slate-200">
            <span className="block truncate">{selected.cate}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiFillDownCircle
                className="h-5 w-5 text-slate-200"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {category.map((cate, cateIdx) => (
                <Listbox.Option
                  key={cateIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-red-300 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={cate}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {cate.cate}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lightRed">
                          <AiFillCheckCircle
                            className="h-5 w-5 text-darkRed"
                            aria-hidden="true"
                          />
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
