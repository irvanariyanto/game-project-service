const { Game } = require('../../../db/models');
const { AppError } = require('../../utils/error');

module.exports = {
  list: async () => {
    const allGames = await Game.findAll();
    return allGames;
  },
  addCounter: async (param, id) => {
    const updatedGame = await Game.findOne({ where: { id: id } });

    if (!updatedGame) {
      throw new AppError('Game Not Found', 404);
    }

    updatedGame[param] += 1;
    await updatedGame.save();

    return {
      id: updatedGame.id,
      [param]: updatedGame[param],
    };
  },
  getDetails: async (id) => {
    const game = await Game.findOne({ where: { id: id } });

    if (!game) {
      throw new AppError('Game Not Found', 404);
    }

    return game;
  },
};
