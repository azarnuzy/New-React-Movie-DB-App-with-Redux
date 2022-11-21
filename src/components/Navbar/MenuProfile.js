import { Menu } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import {
  AiFillGoogleCircle,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../config/firebase';
import { selectLogin, selectLoginStatus } from '../../features/user/userSlice';

export default function MenuProfile() {
  const [customOpen, setCustomOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const loginStatus = useSelector(selectLoginStatus);
  const user = useSelector(selectLogin);
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      console.log('login');
      const data = JSON.parse(localStorage.getItem('user-info')).data;
      setIsLogin(true);
      setFirstName(data.first_name || 'Google');
      setLastName(data.last_name || 'User');
    }
  }, [isLogin, loginStatus, user]);

  function buttonClicked() {
    setCustomOpen((prev) => !prev);
  }

  const handleLogout = () => {
    logout();
    setIsLogin(false);
    setFirstName('');
    setLastName('');
    localStorage.removeItem('user-info');
    localStorage.removeItem('token');
  };

  return (
    <div className={isLogin ? `flex items-center` : 'flex item-center '}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              onClick={buttonClicked}
              className="flex gap-2 items-center"
            >
              {isLogin ? (
                <img
                  src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
                  alt=""
                  className="rounded-full h-[40px]"
                />
              ) : (
                <AiOutlineUser />
              )}
            </Menu.Button>

            {isLogin
              ? customOpen && (
                  <Menu.Items
                    static
                    className="fixed top-11 opacity-90 bg-darkGrey sm:px-5 sm:right-2 right-0 mt-2 w-fit  origin-top-right  rounded-sm md:text-lg  ring-1 ring-black ring-opacity-5 focus:outline-none text-sm flex flex-col gap-3 items-start"
                  >
                    <Menu.Item className="text-left px-3 py-3 flex items-center text-base font-medium gap-2 ">
                      <button
                        onClick={handleLogout}
                        className="text-slate-100 "
                      >
                        <AiOutlineLogout /> Logout
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                )
              : customOpen && (
                  <Menu.Items
                    static
                    className="fixed top-11 opacity-90 bg-darkGrey sm:px-8 sm:right-2 right-0 mt-2 w-fit  origin-top-right  rounded-sm md:text-lg  ring-1 py-3 ring-black ring-opacity-5 focus:outline-none text-sm flex flex-col gap-3 items-start"
                  >
                    <Menu.Item className="text-left flex items-center text-base font-medium gap-2">
                      <Link to={'/login'} className="text-slate-100 ">
                        <AiOutlineUser /> Login
                      </Link>
                    </Menu.Item>
                    <Menu.Item className="text-left flex items-center text-base font-medium gap-2">
                      <Link to={'/signup'} className="text-slate-100 ">
                        <AiOutlineUserAdd /> Register
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                )}
          </>
        )}
      </Menu>
    </div>
  );
}
