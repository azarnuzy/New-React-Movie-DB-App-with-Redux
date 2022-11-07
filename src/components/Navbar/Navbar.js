import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import ModalComponent from './ModalComponent';
import Sidebar from './SidebarComponent';

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-between py-3 mx-2 ">
        <div className="text-slate-200">
          <Sidebar />
        </div>
        <Link to={'/'} className="flex items-center">
          <img src={logo} alt="" className="" />
        </Link>
        <div className="flex gap-3 text-[30px] text-slate-200 items-center">
          <ModalComponent />
        </div>
      </div>
    </div>
  );
}
