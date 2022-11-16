import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import MenuProfile from './MenuProfile';
import SearchModal from './SearchModal';
import Sidebar from './SidebarComponent';

export default function Navbar() {
  return (
    <div className="absolute top-0 w-full z-[9]">
      <div className="flex justify-between py-3 mx-2 relative z-20">
        <div className="text-slate-200 flex items-center">
          <Sidebar />
        </div>
        <Link to={'/'} className="flex items-center">
          <img src={logo} alt="" className="" />
        </Link>
        <div className="flex gap-3 text-[30px] text-slate-200 items-center">
          <SearchModal />
          <MenuProfile />
        </div>
      </div>
    </div>
  );
}
