const jwt = require('jsonwebtoken');

const { SuccessResponse } = require('../../utils/response');
const userRepository = require('./repository');

module.exports = {
  register: async (req, res) => {
    const payload = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const result = await userRepository.register(payload);

    result.password = undefined;

    const response = new SuccessResponse('Success User Register', result);

    res.json(response);
  },

  login: async (req, res) => {
    const email = req.body.email;
    const plainPassword = req.body.password;

    const user = await userRepository.login(email, plainPassword);

    const token = jwt.sign(
      {
        sub: user.id.toString(),
        iss: 'mock-platinum.app.com',
        aud: 'some-client.app.com',
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );

    const response = new SuccessResponse('Success Login', { userId: user.id, token });

    res.json(response);
  },

  getMyHistories: async (req, res) => {
    const playerId = req.user.id;

    const result = await userRepository.getMyHistories(playerId);

    const response = new SuccessResponse('Success List My Games', result);

    res.json(response);
  },

  getMyBio: async (req, res) => {
    const playerId = req.params.userId;

    const result = await userRepository.getMyBio(playerId);

    const response = new SuccessResponse("Success Get user's biodata", result);

    res.json(response);
  },

  getMyGames: async (req, res) => {
    const playerId = req.user.id;

    const result = await userRepository.getMyGames(playerId);

    const response = new SuccessResponse('Success List My Games', result);

    res.json(response);
  },

  getUserBadgeAndPoint: async (req, res) => {
    const playerId = req.params.userId;

    const result = await userRepository.getUserBadgeAndPoint(playerId);

    const response = new SuccessResponse('Success Get Badges&Points of User', result);

    res.json(response);
  },

  editProfile: async (req, res) => {
    const playerId = req.user.id;

    const body = req.body;

    const result = await userRepository.editProfile(body, playerId);

    const response = new SuccessResponse('Success edit profile', result);

    res.json(response);
  },
};
