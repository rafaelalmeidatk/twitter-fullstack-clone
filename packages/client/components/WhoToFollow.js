import React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Avatar from 'components/Avatar';
import FollowButton from 'components/FollowButton';
import colors from '../lib/colors';

const WHO_TO_FOLLOW_QUERY = gql`
  query GetWhoToFollowQuery {
    me {
      id
      whoToFollow {
        id
        name
        username
        avatarSourceUrl
      }
    }
  }
`;

const WhoToFollow = () => {
  const { data, loading } = useQuery(WHO_TO_FOLLOW_QUERY);

  if (loading) return 'Loading...';

  if (!data.me) {
    // There is no user logged in, don't render anything
    return null;
  }

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
            <div className="content">
              <Link
                href={`/profile?username=${user.username}`}
                as={`/profile/${user.username}`}
              >
                <a>
                  <Avatar
                    src={user.avatarSourceUrl}
                    className="user-avatar"
                    size="medium"
                  />
                  <span className="user-info">
                    <span className="name">{user.name}</span>
                    <span className="username tt">@{user.username}abcde</span>
                  </span>
                </a>
              </Link>
              <FollowButton targetUser={user} />
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
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid ${colors.boxBorder};
        }

        .user-row:nth-child(2) {
          margin-top: 0;
        }

        .user-row:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .content {
          padding-left: 58px;
          min-height: 48px;
          width: 100%;
        }

        .content > a {
          display: block;
        }

        .user-row :global(.user-avatar) {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
        }

        .user-info {
          line-height: 0.9em;
          padding-bottom: 6px;

          overflow: hidden;
          text-overflow: ellipsis;

          display: block;
          width: 100%;
          white-space: nowrap;
        }

        a span {
          color: rgba(0, 0, 0, 0.6);
        }

        span .name {
          font-weight: bold;
          font-size: 0.9em;
          color: rgba(0, 0, 0, 0.85);
        }

        a:hover .name {
          color: ${colors.twitterBlueStrong};
          text-decoration: underline;
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
