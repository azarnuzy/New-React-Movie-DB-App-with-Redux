import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/:id" element={<Detail />} />
    </Routes>
  );
}
