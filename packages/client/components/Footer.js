import React from 'react';
import FooterText from 'components/FooterText';

const Footer = () => (
  <div className="footer">
    <div className="content">
      <FooterText />
    </div>
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
