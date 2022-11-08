import { Menu } from '@headlessui/react';
import React, { useState } from 'react';
import {
  AiFillGoogleCircle,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';

export default function MenuProfile() {
  const [customOpen, setCustomOpen] = useState(false);
  function buttonClicked() {
    setCustomOpen((prev) => !prev);
  }
  return (
    <div className="flex items-center">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              onClick={buttonClicked}
              className="flex gap-2 items-center"
            >
              <AiOutlineUser />
            </Menu.Button>

            {customOpen && (
              <Menu.Items
                static
                className="fixed top-11 opacity-90 bg-darkGrey sm:px-5 sm:right-2 right-0 mt-2 w-fit  origin-top-right  rounded-sm md:text-lg  ring-1 ring-black ring-opacity-5 focus:outline-none text-sm flex flex-col gap-3 items-start"
              >
                <Menu.Item className="text-left px-3 pt-3 flex items-center text-base font-medium gap-2">
                  <span className="text-slate-100 ">
                    <AiOutlineUser /> Login
                  </span>
                </Menu.Item>
                <Menu.Item className="text-left px-3 flex items-center text-base font-medium gap-2">
                  <span className="text-slate-100 ">
                    <AiOutlineUserAdd /> Register
                  </span>
                </Menu.Item>
                <div className="h-[1px] w-full bg-gray-400"></div>
                <Menu.Item className="text-left px-3 pb-3 flex items-center text-base">
                  <button className="flex items-center">
                    <AiFillGoogleCircle className=" mr-2 text-xl" /> Sign in
                    with Google
                  </button>
                </Menu.Item>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}
