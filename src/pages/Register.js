import React, { useEffect, useRef, useState } from 'react';
import {
  AiFillEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from 'react-icons/ai';
import { FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import { registerWithEmailAndPassword } from '../config/firebase';
import { selectAllMovies } from '../features/movies/moviesSlice';
import { loginWithFireBase } from '../features/user/userSlice';
import poster from '../images/posterDefault.jpg';

const EMAIL_REGEX = /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const navigate = useNavigate();

  const errRef = useRef();

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const [visiblePass, setVisiblePass] = useState('');
  const [matchVisiblePass, setMatchVisiblePass] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      registerWithEmailAndPassword(username, email, pwd);
      const firstName1 = username.split(' ')[0];
      const lastName1 = username.split(' ')[1];
      dispatch(
        loginWithFireBase({
          data: { first_name: firstName1, last_name: lastName1 },
        })
      );
      localStorage.setItem(
        'user-info',
        JSON.stringify({
          data: { first_name: firstName1, last_name: lastName1 },
        })
      );
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setUsername('');
      navigate('/');
      alert('register success');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
    }
  };

  const item = useSelector(selectAllMovies);

  let bg = apiConfig.w500Image(item[0]?.poster_path || item[0]?.backdrop_path);

  if (bg.indexOf('undefined')) {
    bg = poster;
  }

  return (
    <div className="h-[100vh] flex items-center flex-col justify-center">
      <div className="bg-[#000000db] absolute w-full h-[100vh]"></div>
      <img
        src={bg}
        alt={item[0]?.name || item[0]?.title || 'backdrop image login'}
        className="absolute h-[100vh] w-full object-cover top-0 -z-10"
      />
      <div className="relative z-[3]"></div>
      <div className="flex flex-col items-center justify-center gap-3 relative z-0">
        <h2 className="font-bold text-2xl text-white">Create New Account</h2>
        <span className="text-base font-semibold text-slate-300">
          Please fill in the form to continue
        </span>
      </div>
      <form
        className="w-full relative z-0 lg:w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="py-2 px-4 border text-slate-50 border-slate-300 border-solid rounded-md bg-gray-700 my-3 mx-5 flex justify-between items-center">
          <input
            className="outline-none w-full bg-transparent"
            type="username"
            placeholder="Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoComplete="off"
            required
          />
        </div>
        <div
          className={
            emailFocus && email && !validEmail
              ? `py-2 px-4 border text-slate-50 border-red-500 border-solid rounded-md bg-gray-700 my-3 mx-5 flex justify-between items-center`
              : `py-2 px-4 border text-slate-50 border-slate-300 border-solid rounded-md bg-gray-700 my-3 mx-5 flex justify-between items-center`
          }
        >
          <input
            className="outline-none w-full bg-transparent"
            type="email"
            placeholder="Email Address"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="emailidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            autoComplete="off"
            required
          />
          <label htmlFor="email">
            <AiOutlineMail />
          </label>
        </div>
        <p
          id="emailidnote"
          className={
            emailFocus && email && !validEmail
              ? 'text-sm sm:text-base mx-4 relative rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none -mt-2 text-red-500 pl-3 flex gap-1 items-center'
              : 'offscreen'
          }
        >
          <FaInfoCircle />
          The email is not a valid email address
        </p>
        <div
          className={
            pwdFocus && pwd && !validPwd
              ? `py-2 px-4 border text-slate-50 border-red-500 border-solid rounded-md bg-gray-700 my-3 flex justify-between items-center mx-5 `
              : `py-2 px-4 border text-slate-50 border-slate-300 border-solid rounded-md bg-gray-700 my-3 flex justify-between items-center mx-5 `
          }
        >
          <input
            className="outline-none w-full bg-transparent"
            type={visiblePass ? 'text' : 'password'}
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            id="password"
            required
          />
          <label
            onClick={() => {
              setVisiblePass(!visiblePass);
            }}
          >
            {visiblePass ? <AiFillEye /> : <AiOutlineEyeInvisible />}
          </label>
        </div>

        <div
          id="pwdnote"
          className={
            pwdFocus && pwd && !validPwd
              ? 'text-sm sm:text-base relative rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none text-red-500 pl-3 flex flex-col -mt-2 mx-4'
              : 'offscreen'
          }
        >
          <p>
            <FaInfoCircle />8 to 24 characters. Must include uppercase and
            lowercase letters, a number and a special character. Allowed special
            characters:{' '}
          </p>
          <div className="w-full">
            <span aria-label="exclamation mark">!</span>{' '}
            <span aria-label="at symbol">@</span>{' '}
            <span aria-label="hashtag">#</span>{' '}
            <span aria-label="dollar sign">$</span>{' '}
            <span aria-label="percent">%</span>
          </div>
        </div>
        <div className="py-2 px-4 border text-slate-50 border-slate-300 border-solid rounded-md bg-gray-700 my-3 flex justify-between items-center mx-5">
          <input
            className="outline-none w-full bg-transparent"
            type={matchVisiblePass ? 'text' : 'password'}
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby="pwdnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            id="matchPwd"
            required
          />
          <label
            onClick={() => {
              setMatchVisiblePass(!matchVisiblePass);
            }}
          >
            {matchVisiblePass ? <AiFillEye /> : <AiOutlineEyeInvisible />}
          </label>
        </div>
        <p
          id="confirmnote"
          className={
            matchFocus && !validMatch
              ? 'text-sm sm:text-base relative rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none -mt-3 mb-3 mx-4 text-red-500 pl-3 flex gap-1 items-center'
              : 'offscreen'
          }
        >
          <FaInfoCircle />
          Must match the first password input field.
        </p>
        <div className="mt-7 text-center py-2 px-4 border text-slate-50 border-lightRed border-solid rounded-md bg-lightRed my-3 flex justify-center items-center mx-5 hover:bg-darkRed transform duration-300">
          <button
            className="text-center font-bold text-lg w-full"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex  relative z-0 w-full px-6 mt-3 lg:w-[400px]">
        <span className="text-slate-400 flex gap-3">
          Have an Account?{' '}
          <Link to={'/login'} className="text-white ">
            Log In
          </Link>{' '}
        </span>
      </div>
    </div>
  );
}
