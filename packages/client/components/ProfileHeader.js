import React from 'react';
import Avatar from './Avatar';
import ProfileHeaderStats from './ProfileHeaderStats';
import Button from './Button';
import FollowButton from './FollowButton';

const ProfileHeader = ({ user, currentUser }) => {
  const actionButton =
    currentUser && user.id === currentUser.id ? (
      <div className="action-btn">
        <Button gray narrow>
          Edit Profile
        </Button>
      </div>
    ) : (
      <div className="action-btn">
        <FollowButton />
      </div>
    );

  return (
    <div className="profile-header">
      <div className="cover" />
      <div className="header-bar">
        <div className="container">
          <div className="main-left">
            <Avatar size="very-big" withBorder />
          </div>

          <div className="stats">
            <ProfileHeaderStats
              tweets={32}
              following={503}
              followers={420}
              likes={14}
            />
            {actionButton}
          </div>

          <div className="main-right">{actionButton}</div>
        </div>
      </div>

      <style jsx>{`
        .cover {
          width: 100%;
          height: 280px;
          background-color: tomato;
        }

        .header-bar {
          height: 60px;
          display: flex;
          background: #fff;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
        }

        .container {
          padding: 0 32px;
          display: flex;
        }

        .main-left {
          position: relative;
        }

        .main-left :global(.avatar) {
          position: absolute;
          bottom: -30px;
        }

        .main-left,
        .main-right {
          width: 290px;
          padding: 0 8px;
        }

        .stats {
          flex: 1 1 auto;
          display: flex;
          justify-content: space-between;
        }

        .stats :global(.action-btn),
        .main-right :global(.action-btn) {
          display: flex;
          align-items: center;
        }

        .stats :global(.action-btn) {
          display: none;
        }

        .main-right {
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 1087px) {
          .container {
            width: 100%;
          }
        }

        @media (max-width: 1280px) {
          .main-right {
            display: none;
          }

          .stats :global(.action-btn) {
            display: flex;
          }

          .stats {
            padding-right: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileHeader;
