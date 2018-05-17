const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dummyHash = "dummyHash";

const getCurrentGame = (callback) => {
  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      if (data.Items.length) {
        console.log("data.Items")
        console.log(data.Items)
        callback(data.Items[0]);
      }
      else
        callback(null);
    }
  }
  const params = {
    TableName: process.env.TT_CURRENT_TABLE,
  };
  return dynamodb.scan(params, onScan)
};

const archieveGame = (game, callback) => {
  const archieveParams = {
    TableName: process.env.TT_ARHIEVE_TABLE,
    Item: game
  };
  console.log("archieveGame", archieveParams)
  return dynamodb.put(archieveParams, (err, value) => {
    console.log("err", err)
    if (err)
      return callback(err);
    else {
      const deleteParams = {
        TableName: process.env.TT_CURRENT_TABLE,
        Key: {
          id: game.id
        }
      };
      console.log("deleteGame", deleteParams)
      dynamodb.delete(deleteParams, (err) => {
        console.log("err", err)
        if (err)
          return callback(err);
        else {
          callback(null);
        }
      })
    }
  })
};

const addNewGame = (callback) => {
  const createNewGameParams = {
    TableName: process.env.TT_CURRENT_TABLE,
    Item: {
      id: uuid.v1(),
      score: {
        player1: 0,
        player2: 0,
      },
      startedAt: new Date().getTime().toString(),
      dummyHash,
      player1: "Player 1",
      player2: "Player 2",
    }
  };
  console.log("addNewGame", createNewGameParams)
  dynamodb.put(createNewGameParams, (err, value) => {
    console.log(err)
    if (err)
      return callback(err);
    else {
      callback(null, createNewGameParams.Item);
    }
  });
}

module.exports.createNewGame = (event, context, callback) => {
  getCurrentGame((game) => {
    if (game) {
      archieveGame(game, (err) => {
        err ? callback(null, {
          statusCode: 500
        }) : addNewGame((err, newGame) => {
          err ? callback(null, {
            statusCode: 500
          }) :
            callback(null, {
              statusCode: 200,
              body: JSON.stringify(newGame),
            })
        })
      });
    } else {
      addNewGame((newGame) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(newGame),
        })
      })
    }
  });
};

module.exports.getCurrentGame = (event, context, callback) => {
  getCurrentGame((game) => {
    console.log(game);
    game ? callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
      body: JSON.stringify(game),
    }) : callback(null, {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
    });
  });
};

const isWinningScore = (score) => {
  if (Math.abs(score.player1 - score.player2) > 1 && Math.max(score.player1, score.player2) > 10) {
    return true;
  } else if (Math.min(score.player1, score.player2) < 10 && Math.max(score.player1, score.player2) > 10) {
    return true;
  }
  return false;
}

const updateScore = (game, playerId, callback) => {
  console.log("playerId", playerId)
  console.log("game.score", game.score)
  game.score[playerId] = game.score[playerId] + 1;
  const isGameFinished = isWinningScore(game.score);
  console.log("isGameFinished", isGameFinished)
  if (isGameFinished) {
    archieveGame(game, (err) => {
      err ? callback(err, null) : addNewGame((err, newGame) => {
        err ? callback(err) :
          callback(null, newGame)
      })
    });
  } else {
    console.log("game.score", game.score)
    const updateScoreParams = {
      TableName: process.env.TT_CURRENT_TABLE,
      Item: game
    };
    console.log("updateScore", updateScoreParams)
    dynamodb.put(updateScoreParams, (err, value) => {
      console.log(err)
      if (err)
        return callback(err);
      else {
        callback(null, updateScoreParams.Item);
      }
    });
  }
}

module.exports.updateScore = (event, context, callback) => {
  console.log("updateScore", event)
  getCurrentGame((game) => {
    console.log(game);
    game ? updateScore(game, event.pathParameters.playerId, (err, game) => {
      err ? callback(null, {
        statusCode: 500,
      }) : callback(null, {
        statusCode: 200,
        body: JSON.stringify(game),
      });
    }) : callback(null, {
      statusCode: 404
    });
  });
};

const getRecentGames = (callback) => {
  const from = new Date("11/11/2010").getTime().toString();
  var params = {
    TableName: process.env.TT_ARHIEVE_TABLE,
    ExpressionAttributeValues: {
      ":dummyHash": dummyHash
    },
    KeyConditionExpression: "dummyHash = :dummyHash",
    IndexName: "StartedAtIndex",
    ScanIndexForward: false,
    Limit: 10
  };
  dynamodb.query(params, function (err, data) {
    if (err) {
      callback(err);
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      if (data.Items.length) {
        console.log("data.Items")
        callback(null, data.Items);
      }
      else
        callback(null, []);
    }
  });
};

module.exports.getRecentGames = (event, context, callback) => {
  console.log("getRecentGames", event)
  getRecentGames((err, games) => {
    err ? callback(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
    }) : callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
      body: JSON.stringify(games),
    });
  });
};

module.exports.recordGame = (event, context, callback) => {
  console.log("recordGame", event)
  const game = JSON.parse(event.body);
  game.id = uuid.v1();
  game.startedAt = new Date().getTime().toString();
  game.dummyHash = dummyHash;
  const createNewGameParams = {
    TableName: process.env.TT_ARHIEVE_TABLE,
    Item: game
  };
  console.log("recordGame", createNewGameParams)
  dynamodb.put(createNewGameParams, (err, value) => {
    console.log(err);
    if (err)
      return callback(err);
    else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(game),
      });
    }
  });
};


