import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchModal() {
  let [isOpen, setIsOpen] = useState(false);

  const page = useLocation();
  const navigate = useNavigate();

  const category =
    page.pathname.indexOf('/tv') >= 0
      ? 'tv'
      : page.pathname.indexOf('/movie') >= 0
      ? 'movie'
      : 'multi';
  const [keyword, setKeyword] = useState();

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter') {
      navigate(`/${category}/search/${keyword}`, {
        state: { search: keyword },
      });
      setKeyword('');
      closeModal();
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex items-center">
        <AiOutlineSearch onClick={openModal} />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto z-[100]">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full p-6 max-w-md transform overflow-hidden rounded-2xl bg-darkGrey opacity-90  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium px-4 leading-6 text-slate-300"
                  ></Dialog.Title>
                  <div className="py-2 border-t-0 border-x-0 border-b-2 border-slate-300 border-solid  my-3 flex justify-between items-center">
                    <input
                      type="text"
                      className="outline-none bg-transparent text-slate-400 w-full"
                      id="search-movie"
                      placeholder="What do you want to watch?"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (keyword.length > 0) {
                          handleKeyPressed(e);
                        }
                      }}
                    />
                    <label htmlFor="search-movie">
                      <AiOutlineSearch className="text-gray-600 mr-3" />
                    </label>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
