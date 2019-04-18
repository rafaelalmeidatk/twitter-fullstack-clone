import React from 'react';
import colors from '../lib/colors';
import Icon from './Icon';

const TweetFooter = () => (
  <div className="tweet-footer">
    <div className="reply">
      <Icon name="reply" />
      <span>15</span>
    </div>
    <div className="retweet">
      <Icon name="retweet" />
      <span>15</span>
    </div>
    <div className="like">
      <Icon name="heart" />
      <span>15</span>
    </div>

    <style jsx>{`
      .tweet-footer {
        display: flex;
        color: rgba(55, 55, 55, 0.8);
      }

      .tweet-footer > div {
        padding-right: 4px;
        display: flex;
        align-items: center;
        min-width: 70px;
        cursor: pointer;
      }

      .tweet-footer span {
        margin-left: 8px;
        font-size: 0.8em;
        font-weight: bold;
      }

      .tweet-footer :global(i) {
        font-size: 1.1em;
        color: rgba(55, 55, 55, 0.8);
      }

      .tweet-footer span,
      .tweet-footer :global(i) {
        transition: color 0.2s ease;
      }

      .tweet-footer > div.reply:hover,
      .tweet-footer > div.reply:hover :global(i) {
        color: ${colors.twitterBlue};
      }

      .tweet-footer > div.retweet:hover,
      .tweet-footer > div.retweet:hover :global(i) {
        color: ${colors.retweet};
      }

      .tweet-footer > div.like:hover,
      .tweet-footer > div.like:hover :global(i) {
        color: ${colors.like};
      }
    `}</style>
  </div>
);

const Tweet = ({ name, username, content }) => (
  <div className="tweet">
    <div className="left">
      <div className="avatar" />
    </div>

    <div className="body">
      <div className="meta">
        <span className="name">{name}</span>
        <span className="username">@{username}</span>
      </div>
      <div className="text-content">{content}</div>

      <TweetFooter />
    </div>
    <style jsx>{`
      .tweet {
        padding: 9px 12px;
        display: flex;
        background: #fff;
        border-left: 1px solid ${colors.boxBorder};
        border-right: 1px solid ${colors.boxBorder};
        border-bottom: 1px solid ${colors.boxBorder};
      }

      .avatar {
        width: 48px;
        height: 48px;
        background: tomato;
        border-radius: 50%;
      }

      .body {
        padding-left: 8px;
      }

      .meta {
        line-height: 1em;
      }

      .name {
        font-weight: bold;
        font-size: 0.9em;
        color: rgba(0, 0, 0, 0.85);
      }

      .username {
        margin-left: 5px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 0.9em;
      }

      .text-content {
        margin: 2px 0 8px;
        font-size: 0.9em;
        color: rgba(0, 0, 0, 0.85);
      }
    `}</style>
  </div>
);

export default Tweet;
