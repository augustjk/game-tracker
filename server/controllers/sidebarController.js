module.exports = {
  getData: (req, res) => {
    // type of the query will either be 'ranking' or 'queue'
    const requestType = req.query.type;

    if (requestType === 'ranking') {
      //
    } else if (requestType === 'queue') {
      //
    } else {
      res.status(401).send('Incorrect Request Type');
    }
  }
};
