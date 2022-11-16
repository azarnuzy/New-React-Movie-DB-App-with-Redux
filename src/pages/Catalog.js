import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MovieGrid from '../components/Catalog/MovieGrid';
import PageHeader from '../components/Catalog/PageHeader';

export default function Catalog() {
  const { type, category, keyword, id_genres } = useParams();

  let title = '';

  const location = useLocation();

  console.log(location);
  if (keyword !== undefined && id_genres === undefined) {
    title = `Search by '${keyword}'`;
  } else if (id_genres) {
    title = `Search by Genres: '${
      location.state?.genreName || type || category
    }'`;
  } else {
    title = `${category} ${type}`;
  }
  return (
    <div>
      <PageHeader>{title}</PageHeader>
      <MovieGrid />
    </div>
  );
}
