import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Button from 'components/Button';
import { loginRequest, login } from '../lib/auth';

const IWannaTestItLoginButton = () => {
  const apolloClient = useApolloClient();
  const [loading, setLoading] = useState(false);

  const handleTestLogin = () => {
    setLoading(true);
    loginRequest({ username: 'steve', password: 'steve' })
      .then(res => {
        setTimeout(() => login({ apolloClient, redirectUrl: '/' }), 1);
      })
      .catch(err => {
        console.error('[TEST LOGIN]', err);
      });
  };

  return (
    <Button primary full narrow onClick={handleTestLogin} disabled={loading}>
      I just wanna test it
    </Button>
  );
};

export default IWannaTestItLoginButton;
