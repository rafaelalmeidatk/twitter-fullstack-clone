import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import colors from '../lib/colors';

const WHO_TO_FOLLOW_QUERY = gql`
  query GetWhoToFollowQuery {
    me {
      id
      whoToFollow {
        id
        name
        username
      }
    }
  }
`;

const WhoToFollow = ({ user: currentUser }) => {
  const { data, loading } = useQuery(WHO_TO_FOLLOW_QUERY);

  if (loading) return 'Loading...';

  const users = data.me.whoToFollow;

  return (
    // Hehe this class name is totally not intentional
    <div className="wtf">
      <h3>Who to follow</h3>

      {loading && <div>Loading...</div>}

      {!loading && users.length === 0 && (
        <div className="empty-state">
          Oops, there are no recomendations at the moment!
        </div>
      )}

      {!loading &&
        users.map(user => (
          <div key={user.id} className="user-row">
            <Avatar size="medium" />
            <div className="content">
              <div className="user-info">
                <span className="name">{user.name}</span>
                <span className="username">@{user.username}</span>
              </div>
              <FollowButton targetUser={user} currentUser={currentUser} />
            </div>
          </div>
        ))}
      <style jsx>{`
        .wtf {
          padding: 15px 18px;
          background: #fff;
        }

        h3 {
          color: ${colors.heading};
          font-weight: bold;
          font-size: 1.2em;
          margin-bottom: 12px;
        }

        .empty-state {
          font-size: 0.9em;
          line-height: 1.4em;
          color: rgba(0, 0, 0, 0.6);
        }

        .user-row {
          display: flex;
          align-items: center;
        }

        .content {
          margin-left: 8px;
        }

        .user-info {
          line-height: 0.9em;
          margin-bottom: 6px;
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

        .wtf .content :global(.btn) {
          padding: 2px 26px;
          height: 26px;
          font-size: 0.75em;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default WhoToFollow;
