import React from 'react';

const Title = ({ children }) => (
  <h1>
    {children}
    <style jsx>{`
      h1 {
        color: rgba(0, 0, 0, 0.85);
        font-size: 1.9em;
        font-weight: bold;
        line-height: 1.1em;
      }
    `}</style>
  </h1>
);

export default Title;
