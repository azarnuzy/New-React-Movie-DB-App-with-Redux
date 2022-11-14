import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:type/:category/list" element={<Catalog />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:type/genres/:id_genres" element={<Catalog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
