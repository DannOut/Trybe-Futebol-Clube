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

const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NzQ1NjM2MzMsImV4cCI6MTY3NTE2ODQzM30.6EuUWStOforWnvG82oXqPM5PYR56xf-pjvDOHyL9Pwc';

const invalidToken = 'dskblasdsdahashdbvkjaçsoiçhoasdbjkasjkçasçhsdbjç';

export {
  completeUser,
  failedAuthLogin,
  missingInfoLogin,
  successAuthLogin,
  validToken,
  invalidToken,
};
