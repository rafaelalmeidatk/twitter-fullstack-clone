import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Button from './Button';

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

const FollowButton = ({ targetUser }) => {
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
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Button gray narrow onClick={handleFollowClick} disabled={loading}>
      Follow
    </Button>
  );
};

const UnfollowButton = ({ targetUser }) => {
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
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Button gray narrow onClick={handleUnfollowClick} disabled={loading}>
      Unfollow
    </Button>
  );
};

const FollowButtonBase = ({ targetUser, currentUser }) => {
  return currentUser.isFollowingUser ? (
    <UnfollowButton targetUser={targetUser} />
  ) : (
    <FollowButton targetUser={targetUser} />
  );
};

export default FollowButtonBase;
