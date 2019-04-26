import React from 'react';

const Footer = () => (
  <div className="footer">
    <p className="content">
      Twitter clone created by{' '}
      <a href="https://github.com/rafaelalmeidatk">Rafael Almeida</a>. Check the
      source code{' '}
      <a href="https://github.com/rafaelalmeidatk/twitter-fullstack-clone">
        here
      </a>
      . All rights reserved for <a href="https://twitter.com/">Twitter</a>.
    </p>
    <style jsx>{`
      .footer {
        padding: 15px 18px;
        background: #fff;
      }

      .content {
        font-size: 0.9em;
        line-height: 1.4em;
        color: rgba(0, 0, 0, 0.6);
      }
    `}</style>
  </div>
);

export default Footer;
