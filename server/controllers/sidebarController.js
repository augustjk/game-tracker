const PlayerQueue = require('../managers/queueManager');

module.exports = {
  getData: (req, res) => {
    // type of the query will either be 'ranking' or 'queue'
    const resBody = {};
    resBody.queue = PlayerQueue.getQueue();
    // need to implement the data base
    res.json(resBody);
    res.status(401).send('Incorrect Request Type');
  }
};
