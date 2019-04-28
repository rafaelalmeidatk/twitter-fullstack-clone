import React from 'react';
import ReactModal from 'react-modal';
import Content from './Content';

const TweetModal = ({ isOpen, onClose, tweetId }) => (
  <ReactModal
    isOpen={isOpen}
    // isOpen={true}
    onRequestClose={onClose}
    overlayClassName="tweet-modal-overlay"
    className="tweet-modal-content"
    htmlOpenClassName="tweet-modal-html-open"
  >
    <Content
      tweetId={('d3815867-fbae-48bb-8290-6427d6e4ad7f', tweetId)}
      // tweetId={'754c1bf5-caa9-43b5-bdec-1bc2694430de'}
      onClose={onClose}
    />
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

      .tweet-modal-content {
        position: relative;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 610px;
        margin-bottom: 30px;

        background: #fff;
        border-radius: 6px;
        outline: none;
      }
    `}</style>
  </ReactModal>
);

export default TweetModal;
