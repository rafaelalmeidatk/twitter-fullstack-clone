import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import colors from '../lib/colors';
import AutoResizeTextarea from './AutoResizeTextarea';
import Avatar from './Avatar';
import Button from './Button';
import NewTweetToolbar from './NewTweetToolbar';
import GET_USER_FEED_QUERY, { DEFAULT_VARIABLES } from '../queries/getUserFeed';

const CREATE_TWEET_QUERY = gql`
  mutation CreateTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
      id
      content
      retweeted
      liked
      user {
        id
        name
        username
      }
    }
  }
`;

const NewTweetForm = ({ onCancel }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const createTweet = useMutation(CREATE_TWEET_QUERY);

  const handleContentChange = e => {
    const { value } = e.target;
    setContent(value);
  };

  const handleCreateTweet = async () => {
    setLoading(true);

    createTweet({
      variables: { input: { content } },
      update: (proxy, { data: { createTweet } }) => {
        try {
          const data = proxy.readQuery({
            query: GET_USER_FEED_QUERY,
            variables: DEFAULT_VARIABLES,
          });

          const newTweetEdge = {
            cursor: null, // we can't compute the cursor on front-end
            node: {
              __typename: 'FeedNode',
              tweet: createTweet,
              retweet: null,
              like: null,
            },
            __typename: 'FeedEdge',
          };

          const newData = {
            ...data,
            feed: {
              ...data.feed,
              edges: [newTweetEdge, ...data.feed.edges],
            },
          };

          proxy.writeQuery({
            query: GET_USER_FEED_QUERY,
            variables: DEFAULT_VARIABLES,
            data: newData,
          });
        } catch (err) {
          console.error('[UPDATE CACHE]', err);
        }
      },
    })
      .then(() => {
        setLoading(false);
        setContent('');
      })
      .catch(err => {
        console.error('[NEW TWEET]', err);
      });
  };

  const handleBlur = () => {
    if (!content) onCancel();
  };

  return (
    <form>
      <AutoResizeTextarea
        autoFocus
        className="input"
        placeholder="What's hapenning?"
        rows={2}
        value={content}
        onBlur={handleBlur}
        onChange={handleContentChange}
      />

      <NewTweetToolbar
        tweetButton={
          <Button narrow primary onClick={handleCreateTweet} disabled={loading}>
            Tweet
          </Button>
        }
      />

      <style jsx>{`
        form {
          margin-left: 8px;
          flex: 1 1 auto;
        }

        form :global(.input) {
          padding: 6px 8px;
          width: 100%;
          min-height: 80px;
          box-shadow: none;
          font-size: 0.9em;
          resize: none;
          border: 1px solid ${colors.inputBlueBorder};
          border-radius: 8px;
          overflow: auto;
        }

        form :global(.input):focus {
          box-shadow: 0 0 0 1px ${colors.inputBlueBorder};
        }

        :global(.input)::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </form>
  );
};

const NewTweet = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="new-tweet">
      <Avatar size="small" />
      {open ? (
        <NewTweetForm
          onCancel={() => {
            setOpen(false);
          }}
        />
      ) : (
        <form>
          <textarea
            className="input"
            placeholder="What's hapenning?"
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          />
        </form>
      )}

      <style jsx>{`
        .new-tweet {
          padding: 10px 12px 10px 18px;
          display: flex;
          background-color: ${colors.newTweetBg};
          border: 1px solid ${colors.boxBorder};
        }

        form {
          margin-left: 8px;
          flex: 1 1 auto;
        }

        .input {
          padding: 6px 8px;
          width: 100%;
          height: 36px;
          border: 1px solid ${colors.inputBlueBorder};
          box-shadow: none;
          font-size: 0.9em;
          resize: none;
        }

        .input:hover {
          border: 1px solid ${colors.inputBlueBorder};
        }

        .input::placeholder {
          color: ${colors.twitterBlue};
        }
      `}</style>
    </div>
  );
};

export default NewTweet;
