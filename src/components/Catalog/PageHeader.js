import React from 'react';
import pageHeader from '../../images/pageHeader.png';
export default function PageHeader({ children }) {
  return (
    <div className="text-lg font-bold">
      <img
        src={pageHeader}
        alt=""
        className="w-full h-[30vh] object-cover absolute top-0 left-0 brightness-[0.6] -z-10"
      />
      <h2 className="text-white h-[20vh]  flex items-center mx-3 sm:mx-1 mb-14 sm:text-2xl">
        {children.toUpperCase().split('_').join(' ')}
      </h2>
    </div>
  );
}
