import React from 'react';
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer class="relative bg-blueGray-200 pt-8 pb-6">
      <div class="container mx-auto px-2">
        <div class="flex flex-wrap text-left lg:text-left">
          <div class="w-full lg:w-6/12 px-2">
            <h4 class="text-3xl fonat-semibold text-blueGray-700">
              Let's keep in touch!
            </h4>
            <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
              Find Me on any of these platforms, i respond as possible i can.
            </h5>
            <div class="mt-6 lg:mb-0 mb-6">
              <button
                class="bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <span className="flex justify-center">
                  <AiFillTwitterCircle className="text-blue-400" />
                </span>
              </button>
              <button
                class="bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <span className="flex justify-center">
                  <AiFillFacebook className="text-blue-600" />
                </span>
              </button>
              <button
                class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <span className="flex justify-center">
                  <AiFillInstagram />
                </span>
              </button>
              <button
                class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <span className="flex justify-center">
                  <AiFillGithub />
                </span>
              </button>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-2">
            <div class="flex flex-wrap items-top mb-6">
              <div class="w-full lg:w-4/12 px-2 ml-auto">
                <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      About Me
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div class="w-full lg:w-4/12 px-2">
                <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="http://#"
                    >
                      Contact Me
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6 border-blueGray-300" />
        <div class="flex flex-wrap items-center md:justify-between justify-center">
          <div class="w-full md:w-4/12 px-2 mx-auto text-center">
            <div class="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2022</span>
              <Link
                href="http://#"
                class="text-blueGray-500 hover:text-gray-800"
                target="_blank"
              >
                {' '}
                Movies React App by{' '}
                <Link class="text-blueGray-500 hover:text-blueGray-800">
                  M. Azar Nuzy
                </Link>
                .
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
