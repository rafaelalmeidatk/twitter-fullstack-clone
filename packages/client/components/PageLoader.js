import React from 'react';
import Loading from 'components/Loading';

const PageLoader = () => (
  <div className="page-loader">
    <Loading noSsr />
    <style jsx>{`
      .page-loader {
        padding: 30px;
        text-align: center;
      }
    `}</style>
  </div>
);

export default PageLoader;
