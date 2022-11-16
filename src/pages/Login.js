import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import { selectAllMovies } from '../features/movies/moviesSlice';
import poster from '../images/posterDefault.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setErrMsg] = useState('');

  const item = useSelector(selectAllMovies);

  let bg = apiConfig.w500Image(item[0]?.poster_path || item[0]?.backdrop_path);

  if (bg.indexOf('undefined')) {
    bg = poster;
  }

  return (
    <div className="h-[80vh] flex items-center flex-col justify-center">
      <div className="bg-[#000000db] absolute w-full h-[80vh]"></div>
      <img
        src={bg}
        alt={item[0]?.name || item[0]?.title || 'backdrop image login'}
        className="absolute h-[80vh] w-full object-cover top-0 -z-10"
      />
      <div className="relative z-[3]"></div>
      <div className="flex flex-col items-center justify-center gap-3 relative z-0">
        <h2 className="font-bold text-2xl text-white">Log In Now</h2>
        <span className="text-base font-semibold text-slate-300">
          Please login to continue using our app
        </span>
      </div>
      <form className="w-full relative z-0 lg:w-[400px]">
        <div className="py-2 px-4 border text-slate-50 border-slate-300 border-solid rounded-md bg-gray-700 my-3 mx-5 flex justify-between items-center">
          <input
            className="outline-none w-full bg-transparent"
            type="email"
            placeholder="Email Address"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
            required
          />
          <label htmlFor="email">
            <AiOutlineMail />
          </label>
        </div>
        <div className="py-2 px-4 border text-slate-50 border-slate-300 border-solid rounded-md bg-gray-700 my-3 flex justify-between items-center mx-5">
          <input
            className="outline-none w-full bg-transparent"
            type="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            required
          />
          <label htmlFor="password">
            <AiOutlineEyeInvisible />
          </label>
        </div>
        <div className="mt-7 text-center py-2 px-4 border text-slate-50 border-lightRed border-solid rounded-md bg-lightRed my-3 flex justify-center items-center mx-5 hover:bg-darkRed transform duration-300">
          <button className="text-center font-bold text-lg">Log In</button>
        </div>
      </form>
      <div className="flex  relative z-0 w-full px-6 mt-3 lg:w-[400px]">
        <span className="text-slate-400 flex gap-3">
          Are you new in Movielist?{' '}
          <Link to={'/signup'} className="text-white ">
            Sign Up Now
          </Link>{' '}
        </span>
      </div>
    </div>
  );
}
