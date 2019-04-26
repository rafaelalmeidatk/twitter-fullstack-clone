import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Button from './Button';
import colors from '../lib/colors';

const FETCH_USER_FOLLOWERS_QUERY = gql`
  query FetchUserFollowers($username: String) {
    user(input: { username: $username }) {
      id
      followersCount
    }
  }
`;

const IS_FOLLOWING_USER_QUERY = gql`
  query IsFollowingUser($username: String!) {
    me {
      id
      isFollowingUser(username: $username)
    }
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($input: FollowUserInput!, $targetUsername: String!) {
    followUser(input: $input) {
      user {
        id
        # Refetch the follower status
        isFollowingUser(username: $targetUsername)
      }
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($input: UnfollowUserInput!, $targetUsername: String!) {
    unfollowUser(input: $input) {
      user {
        id
        # Refetch the follower status
        isFollowingUser(username: $targetUsername)
      }
    }
  }
`;

const FollowButton = ({ targetUser, onFollowersStatusChange }) => {
  const [loading, setLoading] = useState(false);

  const follow = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      input: { targetId: targetUser.id },
      targetUsername: targetUser.username,
    },
  });

  const handleFollowClick = async () => {
    setLoading(true);
    try {
      await follow();
      onFollowersStatusChange();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Button narrow onClick={handleFollowClick} disabled={loading}>
      Follow
    </Button>
  );
};

const UnfollowButton = ({ targetUser, onFollowersStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const unfollow = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      input: { targetId: targetUser.id },
      targetUsername: targetUser.username,
    },
  });

  const handleUnfollowClick = async () => {
    setLoading(true);
    try {
      await unfollow();
      onFollowersStatusChange();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="unfollow-btn-wrapper">
      <Button
        className={'unfollow-btn'}
        primary
        narrow
        onClick={handleUnfollowClick}
        disabled={loading}
      >
        <span className="following-txt">Following</span>
        <span className="unfollow-txt">Unfollow</span>
      </Button>

      <style jsx>{`
        .unfollow-btn-wrapper {
          position: relative;
        }

        .unfollow-txt {
          display: none;
          position: absolute;
          left: 0;
          right: 0;
        }

        .unfollow-btn-wrapper:hover .following-txt {
          visibility: hidden;
        }
        .unfollow-btn-wrapper:hover .unfollow-txt {
          display: inline;
        }

        .unfollow-btn-wrapper:hover :global(button.btn.unfollow-btn) {
          background-color: ${colors.buttonDanger};
          border: none;
          color: #fff;
        }

        :global(button.btn.unfollow-btn) {
          transition: none;
        }

        .unfollow-btn-wrapper:hover :global(button.btn.unfollow-btn[disabled]) {
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
};

const FollowButtonBase = ({ targetUser }) => {
  const isFollowingUserQuery = useQuery(IS_FOLLOWING_USER_QUERY, {
    variables: { username: targetUser.username },
  });

  const refetchUserFollowers = useQuery(FETCH_USER_FOLLOWERS_QUERY, {
    skip: true,
    variables: { username: targetUser.username },
  });

  const handleFollowingStatusChange = async () => {
    try {
      await refetchUserFollowers.refetch();
    } catch (err) {
      console.error('Error when trying to refetch the followers', err);
    }
  };

  if (isFollowingUserQuery.loading) {
    return 'Loading...';
  }

  return isFollowingUserQuery.data.me.isFollowingUser ? (
    <UnfollowButton
      targetUser={targetUser}
      onFollowersStatusChange={handleFollowingStatusChange}
    />
  ) : (
    <FollowButton
      targetUser={targetUser}
      onFollowersStatusChange={handleFollowingStatusChange}
    />
  );
};

export default FollowButtonBase;
