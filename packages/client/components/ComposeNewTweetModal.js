import React from 'react';
import ReactModal from 'react-modal';
import colors from '../lib/colors';
import NewTweetWithMutation from 'components/NewTweetWithMutation';
import Icon from 'components/Icon';

const ModalContent = ({ onClose }) => (
  <div className="content">
    <div className="header">
      <h3>Compose new Tweet</h3>
    </div>

    <div className="body">
      <NewTweetWithMutation expanded={true} onTweetCreated={onClose} />
    </div>

    <button className="btn-close" onClick={onClose}>
      <Icon name="close" size="18px" />
    </button>

    <style jsx>{`
      .header {
        padding: 12px;
        text-align: center;
        color: rgba(0, 0, 0, 0.9);
        font-size: 0.84em;
        font-weight: bold;
        line-height: 0.9em;
        border-bottom: solid 1px rgba(27, 149, 224, 0.25);
      }

      .header h3 {
        margin-bottom: 0;
      }

      .body {
        padding: 8px 0px;
        background-color: ${colors.newTweetBg};
      }

      .body :global(.new-tweet) {
        padding: 10px 12px;
      }

      .btn-close {
        position: absolute;
        top: 13px;
        right: 12px;
        padding: 0;
        background: none;
        border: none;
      }

      .btn-close :global(i) {
        color: ${colors.blueGray};
      }
    `}</style>
  </div>
);

const ComposeNewTweetModal = ({ isOpen, onClose }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    overlayClassName="compose-new-tweet-overlay"
    className="compose-new-tweet-content"
  >
    <ModalContent onClose={onClose} />
    <style jsx global>{`
      .compose-new-tweet-overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 9999;
      }

      .compose-new-tweet-content {
        position: relative;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 610px;

        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        outline: none;
      }
    `}</style>
  </ReactModal>
);

export default ComposeNewTweetModal;
