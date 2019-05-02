module.exports = {
  createUserAvatarUrl: email => {
    return `https://api.adorable.io/avatars/200/${email}.png`;
  },
};
