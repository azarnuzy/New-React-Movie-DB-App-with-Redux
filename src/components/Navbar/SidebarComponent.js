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
                <Link to={'/movie/popular/list'}>Popular</Link>
                <Link to={'/movie/top_rated/list'}>Top Rated</Link>
                <Link to={'/movie/upcoming/list'}>Upcoming</Link>
                <Link to={'/movie/now_playing/list'}>Now Playing</Link>
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
                <Link to={'/tv/popular/list'}>Popular</Link>
                <Link to={'/tv/top_rated/list'}>Top Rated</Link>
                <Link to={'/tv/on_the_air/list'}>On TV</Link>
                <Link to={'/tv/airing_today/list'}>Airing Today</Link>
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
    <div className="">
      <AiOutlineMenu className="text-xl" onClick={() => setIsShow(true)} />
      <div
        className={`transform ${
          isShow ? '-translate-x-0' : '-translate-x-[9999px]'
        } duration-300
         h-[100vh] bg-darkGrey left-0 fixed top-0 w-[80vw] sm:w-[30vw] opacity-90 z-20`}
      >
        <MenuSidebar setIsShow={setIsShow} />
      </div>
    </div>
  );
}
