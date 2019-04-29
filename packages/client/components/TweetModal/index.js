import React from 'react';
import ReactModal from 'react-modal';
import Content from './Content';
import Icon from 'components/Icon';

const TweetModal = ({ isOpen, tweetId, onTweetClick, onClose }) => (
  <ReactModal
    isOpen={isOpen}
    // isOpen={true}
    onRequestClose={onClose}
    overlayClassName="tweet-modal-overlay"
    className="tweet-modal-content"
    htmlOpenClassName="tweet-modal-html-open"
  >
    <button className="tweet-modal-btn-close" onClick={onClose}>
      <Icon name="close" color="#ffffff" size="27px" />
    </button>

    <div className="inner-content">
      <Content
        tweetId={tweetId}
        // tweetId={'754c1bf5-caa9-43b5-bdec-1bc2694430de'}
        onTweetClick={onTweetClick}
        onClose={onClose}
      />
    </div>
    <style jsx global>{`
      .tweet-modal-html-open {
        overflow: hidden;
      }

      .tweet-modal-overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 9999;
        overflow-y: scroll;
      }

      .tweet-modal-btn-close {
        position: fixed;
        top: -50px;
        left: calc(100% + (100vw - 610px) / 2);
        transform: translateX(-200%);

        width: 27px;
        height: 27px;
        cursor: pointer;
        background: 0;
        padding: 0;
        border: 0;
      }

      .tweet-modal-content {
        position: relative;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 610px;
        margin-bottom: 30px;
        outline: none;
      }

      .tweet-modal-content > .inner-content {
        background-color: #fff;
        border-radius: 8px;
        outline: none;
        overflow: hidden;
      }
    `}</style>
  </ReactModal>
);

export default TweetModal;
