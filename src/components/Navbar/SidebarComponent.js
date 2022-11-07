import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineRight } from 'react-icons/ai';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';

function MenuSidebar({ setIsShow }) {
  return (
    <div className="w-full px-1 pt-3">
      <div className="w-full max-w-md rounded-2x p-2">
        <AiOutlineClose
          className=" text-2xl mb-2"
          onClick={() => setIsShow(false)}
        />
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-1 py-1 text-left text-sm text-white font-bold">
                <span className="text-xl ">Movies</span>
                <AiOutlineRight
                  className={`transition duration-300 ${
                    open ? 'rotate-90 transform' : ''
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-1 text-lg flex flex-col">
                <Link to={'/movie'}>Popular</Link>
                <Link to={'/movie/top-rated'}>Top Rated</Link>
                <Link to={'/movie/upcoming'}>Upcoming</Link>
                <Link to={'/movie/now-playing'}>Now Playing</Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-1 py-1 text-left text-sm text-white font-bold">
                <span className="text-xl ">TV Shows</span>
                <AiOutlineRight
                  className={`transition duration-300 ${
                    open ? 'rotate-90 transform ' : ''
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-1 text-lg flex flex-col">
                <Link to={'/tv'}>Popular</Link>
                <Link to={'/tv/top-rated'}>Top Rated</Link>
                <Link to={'/tv/on-the-air'}>On TV</Link>
                <Link to={'/tv/airing-today'}>Airing Today</Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default function SidebarComponent() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <AiOutlineMenu className="text-xl" onClick={() => setIsShow(true)} />
      <div
        className={`transform ${
          isShow ? '-translate-x-0' : '-translate-x-96'
        } duration-300
         h-[100vh] bg-darkGrey left-0 fixed top-0 w-[80vw] opacity-90 z-10`}
      >
        <MenuSidebar setIsShow={setIsShow} />
      </div>
    </div>
  );
}
