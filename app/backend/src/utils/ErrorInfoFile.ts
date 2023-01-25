const incorrectEmailOrPassword = {
  status: 401,
  message: 'Incorrect email or password',
};

const sameTeamError = {
  status: 422,
  message: 'It is not possible to create a match with two equal teams',
};

const teamIdNotFound = {
  status: 404,
  message: 'There is no team with such id!',
};

const blankFields = 'All fields must be filled';

export { incorrectEmailOrPassword, blankFields, sameTeamError, teamIdNotFound };
