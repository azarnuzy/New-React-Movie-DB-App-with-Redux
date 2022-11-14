import React from 'react';
import { useParams } from 'react-router-dom';
import MovieGrid from '../components/Catalog/MovieGrid';
import PageHeader from '../components/Catalog/PageHeader';

export default function Catalog() {
  const { type, category } = useParams();

  return (
    <div>
      <PageHeader>{`${category} ${type}`}</PageHeader>
      <MovieGrid />
    </div>
  );
}
