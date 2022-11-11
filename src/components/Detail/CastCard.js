import React from 'react';
import apiConfig from '../../api/apiConfig';
import noImage from '../../images/noImage.png';

export default function CastCard({ cast }) {
  const bg =
    cast.profile_path !== null
      ? apiConfig.w500Image(cast.profile_path)
      : noImage;
  return (
    <div>
      <div className="relative group">
        <img
          src={bg}
          alt=""
          className="rounded-lg  group-hover:brightness-[0.25] transition ease-out delay-75 duration-300"
        />
        <h3 className="text-white font-semibold text-sm w-full mt-1">
          {cast.name || cast.original_name}
        </h3>
      </div>
    </div>
  );
}
