import React from 'react';
import colors from '../lib/colors';
import Icon from './Icon';

const Search = () => (
  <div className="search">
    <input type="text" placeholder="Search Twitter" />
    <button disabled>
      <Icon name="search " color={colors.blueGrayStrong} size="18px" />
    </button>

    <style jsx>{`
      .search {
        margin: 0 10px;
        display: flex;
        align-items: center;
        position: relative;
      }

      input {
        width: 220px;
        outline: none;
        border: 0;
        padding: 5px 32px 5px 12px;
        color: ${colors.blueGray};
        border: 1px solid ${colors.boxBorder};
        border-radius: 20px;
        background-color: ${colors.searchInputBg};
        transition: border 0.5s ease;
      }

      input:focus {
        border: 2px solid ${colors.twitterBlueStrong};
      }

      button {
        position: absolute;
        right: 12px;
        margin: 0;
        padding: 0;
        background: none;
        border: none;
      }
    `}</style>
  </div>
);

export default Search;
