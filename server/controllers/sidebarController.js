const PlayerQueue = require('../managers/queueManager');
const { getDBList } = require('../controllers/dbController');

module.exports = {
  getData: (req, res) => {
    const resBody = {};
    resBody.queue = PlayerQueue.getQueue();

  // add ranking to resBody
  getDBList()
  .then(resp => {
    resBody.ranking = resp;
    // console.log(resBody);
    socketCollection.forEach((ws)=>{
      if (ws.readyState === 1) {
        ws.send(JSON.stringify(resBody));
      }
    });
    res.json(resBody);
  });
    
  }
};
