import React from 'react';
import { useParams } from 'react-router-dom';
import MovieGrid from '../components/Catalog/MovieGrid';
import PageHeader from '../components/Catalog/PageHeader';

export default function Catalog() {
  const { type, category, keyword } = useParams();
  let title = '';
  if (keyword !== undefined) {
    title = `Search by '${keyword}'`;
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
