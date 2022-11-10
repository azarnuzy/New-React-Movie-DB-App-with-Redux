import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { selectTrailerMovies } from '../../features/trending/trending';

export default function ModalTrailer() {
  let [isOpen, setIsOpen] = useState(false);
  const trailer = useSelector(selectTrailerMovies);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <AiFillYoutube
        onClick={openModal}
        className="group-hover:transform group-hover:scale-[1.02] group-hover:transition group-hover:duration-200 absolute z-20  text-6xl text-slate-400 top-1/2 left-1/2 transform -translate-x-6 -translate-y-2 shadow-md"
      />
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
                <Dialog.Panel className="w-full p-3 max-w-md transform overflow-hidden rounded-2xl bg-darkGrey opacity-90  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium px-4 leading-6 text-slate-300"
                  ></Dialog.Title>
                  <div className=" border-t-0 border-x-0 border-b-2 border-slate-300 border-solid  my-3 flex justify-between items-center">
                    <iframe
                      width="420"
                      height="315"
                      src={`https://www.youtube.com/embed/${trailer[0]?.key}`}
                      title="unix"
                    ></iframe>
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
