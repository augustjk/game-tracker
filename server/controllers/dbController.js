const db = require('./dbModel');

module.exports = {
  handleGameEndDBRequest: (winner, loser) => {
    console.log(winner, loser);
    // need to check if winner and loser exists. if they do, update their stats, if they don't
    // add them to the database for the first time
    // db.query('do query here');
    findUser(winner)
      .then(score => {
        updateUser(winner, true, score.wins + 1);
      })
      .catch(err => {
        // console.log(err);
        addNewUser(winner, true);
      });

    findUser(loser)
      .then(score => {
        // console.log('user', loser, 'losses', score);
        updateUser(loser, false, score.losses + 1);
      })
      .catch(() => {
        addNewUser(loser, false);
      });
  }
};

function findUser(user) {
  // console.log(`attempting to find user ${user}`);
  return new Promise((resolve, reject) => {
    db.query(`SELECT * from stats_database WHERE username = '${user}';`)
      .then(dbRes => {
        // console.log('inside find user, got db response ->');
        const username = dbRes.rows[0].username;
        const wins = dbRes.rows[0].wins;
        const losses = dbRes.rows[0].losses;
        resolve({ username, wins, losses });
      })
      .catch(err => {
        // console.log(`can't find user ${user}: adding user to db`);
        reject(err);
      });
  });
}
function addNewUser(newUser, isWinner) {
  return db.query(
    'INSERT INTO stats_database ("username", "wins", "losses") VALUES($1, $2, $3)',
    [newUser, isWinner ? 1 : 0, isWinner ? 0 : 1]
  );
}
function updateUser(updateUser, isWinner, newScore) {
  // console.log('checking new score:', newScore);
  return db.query(
    `UPDATE stats_database SET ${
      isWinner ? 'wins' : 'losses'
    } = '${newScore}' WHERE username = '${updateUser}';`
  );
}
