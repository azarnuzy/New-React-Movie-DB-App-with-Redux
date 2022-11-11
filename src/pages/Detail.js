import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/Detail/Header';
import {
  fetchCastsMovie,
  fetchDetailMovie,
} from '../features/detail/detailSlice';

export default function Detail() {
  const dispatch = useDispatch();

  let { category, id } = useParams();
  useEffect(() => {
    dispatch(fetchDetailMovie({ category, id }));
    dispatch(fetchCastsMovie({ category, id }));
    window.scrollTo(0, 0);
  }, [category, dispatch, id]);

  return (
    <div>
      <Header />
    </div>
  );
}
