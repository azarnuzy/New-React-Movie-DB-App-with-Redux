import { Menu } from '@headlessui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import MenuProfile from './MenuProfile';
import SearchModal from './SearchModal';
import Sidebar from './SidebarComponent';
import { useWindowWidth } from '@react-hook/window-size';

export default function Navbar() {
  const width = useWindowWidth();
  const [customOpenMovie, setCustomOpenMovie] = useState(false);

  function buttonClickedMovie() {
    setCustomOpenMovie((prev) => !prev);
  }
  const [customOpenTv, setCustomOpenTv] = useState(false);

  function buttonClickedTv() {
    setCustomOpenTv((prev) => !prev);
  }

  const isPhone = () => {
    if (width > 640) {
      return true;
    }

    return false;
  };
  return (
    <div className="absolute top-0 w-full z-[9]">
      <div className="flex justify-between py-3 mx-2 lg:mx-auto max-w-[1280px] relative z-20">
        <div className="text-slate-200 flex items-center gap-3">
          <Sidebar />
          {/* {isPhone && (
            <div className="flex items-center">
              <Menu className="relative">
                {({ open }) => (
                  <>
                    <Menu.Button
                      onClick={() => {
                        if (customOpenTv) {
                          buttonClickedTv();
                        }
                        buttonClickedMovie();
                      }}
                      className="text-2xl"
                    >
                      Movies
                    </Menu.Button>
                    {customOpenMovie && (
                      <Menu.Items
                        static
                        className="absolute opacity-90 top-8 bg-darkGrey px-4 py-3  mt-2 w-fit  rounded-sm md:text-lg  ring-1 ring-black ring-opacity-5 focus:outline-none text-sm flex flex-col gap-1 items-start"
                      >
                        <Menu.Item>
                          <Link to={'/movie/popular/list'}>Popular</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to={'/movie/top_rated/list'}>Top Rated</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to={'/movie/upcoming/list'}>Upcoming</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to={'/movie/now_playing/list'}>
                            Now Playing
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    )}
                  </>
                )}
              </Menu>
            </div>
          )}
          {isPhone && (
            <div className="flex items-center">
              <Menu className="relative">
                {({ open }) => (
                  <>
                    <Menu.Button
                      onClick={() => {
                        if (customOpenMovie) {
                          buttonClickedMovie();
                        }
                        buttonClickedTv();
                      }}
                      className="text-2xl"
                    >
                      Television
                    </Menu.Button>
                    {customOpenTv && (
                      <Menu.Items
                        static
                        className="absolute opacity-90 top-8 bg-darkGrey px-4 py-3  mt-2 w-fit  rounded-sm md:text-lg  ring-1 ring-black ring-opacity-5 focus:outline-none text-sm flex flex-col gap-1 items-start"
                      >
                        <Menu.Item>
                          <Link to={'/tv/popular/list'}>Popular</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to={'/tv/top_rated/list'}>Top Rated</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to={'/tv/on_the_air/list'}>On TV</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to={'/tv/airing_today/list'}>Airing Today</Link>
                        </Menu.Item>
                      </Menu.Items>
                    )}
                  </>
                )}
              </Menu>
            </div>
          )} */}
        </div>

        <Link
          to={'/'}
          className="flex items-center md:order-1 text-white gap-3"
        >
          <img src={logo} alt="" className="" />
        </Link>
        <div className="flex gap-3 text-[30px] text-slate-200 items-center order-3">
          <SearchModal />
          <MenuProfile />
        </div>
      </div>
    </div>
  );
}
