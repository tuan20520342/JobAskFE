import React from 'react';
import { Helmet } from 'react-helmet';
import NotFoundImg from '~/components/UI/NotFound';

const PageNotFound = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Helmet>
        <title>404 | Lapteller</title>
      </Helmet>
      <NotFoundImg />
    </div>
  );
};
export default PageNotFound;
