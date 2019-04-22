import React from 'react';
import colors from '../lib/colors';
import Icon from './Icon';

const ToolbarButton = ({ iconName, disabled, onClick }) => (
  <button className="toolbar-btn" disabled={disabled}>
    <Icon name={iconName} />
    <style jsx>{`
      button {
        padding: 4px 10px 6px;
        background: none;
        display: flex;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover:not([disabled]) {
        border-color: rgba(27, 149, 224, 0.4);
        background: linear-gradient(
          rgba(255, 255, 255, 0),
          rgba(27, 149, 224, 0.1)
        );
      }

      button[disabled] {
        opacity: 0.5;
        cursor: initial;
      }

      button :global(i) {
        font-size: 24px;
        line-height: 24px;
        color: ${colors.twitterBlue};
      }
    `}</style>
  </button>
);

const NewTweetToolbar = ({ tweetButton }) => (
  <div className="toolbar">
    <div className="btns">
      <ToolbarButton iconName="camera" />
      <ToolbarButton iconName="gif" disabled />
      <ToolbarButton iconName="pollBar" disabled />
      <ToolbarButton iconName="geo" disabled />
    </div>

    {tweetButton}

    <style jsx>{`
      .btns {
        display: flex;
      }

      .toolbar {
        padding: 10px 0 0;
        display: flex;
        justify-content: space-between;
      }

      :global(.toolbar-btn) {
        margin-right: 4px;
      }
    `}</style>
  </div>
);

export default NewTweetToolbar;
