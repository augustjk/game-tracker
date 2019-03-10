const PlayerQueue = require('../managers/queueManager');

module.exports = {
  getData: (req, res) => {
    const resBody = {};
    resBody.queue = PlayerQueue.getQueue();
    // need to implement the data base
    // add ranking to resBody
    res.json(resBody);
  }
};
