import * as mongodb from 'mongodb';
 const MongoClient = mongodb.MongoClient;

import * as assert from 'assert';

const uri = "mongodb+srv://tsemach:LgA4VfbH0knDwcPh@center-1-kivdh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  assert.equal(null, err);

  console.log("database is connected");
  const db = client.db('intel-todo');

  //const collection = client.db("adwa").collection("graphql");

  // perform actions on the collection object
  //client.close();
  insertDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  // get the documents collection
  const collection = db.collection('todos');

  // insert some documents
  collection.insertMany([
    {
      displayName: 'Tsemach Mizrachi',
      username: 'tsemach@intel.com',
      todos: [
        {
          title: 'Finish this angular http client',
          items: [
            {
              header: 'complete get all todos',
              isCompleted: true
            },
            {
              header: 'parse response with rxjs',
              isCompleted: false
            }
          ]
        }
      ]
    },
    // {
    //   displayName: 'Nir Ranchmani',
    //   username: 'nir.nrahmani@intel.com',
    //   todos: [
    //     {
    //       title: 'Hire Tsemach',
    //       items: [
    //         {
    //           header: 'Run interview on 30-Jul',
    //           isCompleted: true
    //         },
    //         {
    //           header: 'Send home assigment',
    //           isCompleted: false
    //         }
    //       ]
    //     }
    //   ]
    // },

  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    assert.equal(2, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}