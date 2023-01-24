const completeUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

const failedAuthLogin = {
  email: 'user@user.com',
  password: 'hbcdsjhabjsh',
};

const missingInfoLogin = {
  email: 'user@user.com',
};

const successAuthLogin = {
  email: 'user@user.com',
  password: 'secret_user',
};
