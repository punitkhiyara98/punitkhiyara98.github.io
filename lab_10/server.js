// These are our required libraries to make the server work.

import express from 'express';
import fetch from 'node-fetch';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import writeUser from './libraries/writeuser';

const dbSettings = {
  filename: './tmp/Database.db',
  driver: sqlite3.Database
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

async function dbBoot() {
  const db = await open(dbSettings);
  console.log('async DB boot');
}

// Syntax change - we don't want to repeat ourselves,
// or we'll end up with spelling errors in our endpoints.
//
app
  .route('/api')
  .get((req, res) => {
    (async () => {
      const db = await open(dbSettings);
      const result = await db.all('SELECT * FROM user');
      console.log('Expected result', result);
      res.json(result);
    })();
  })
  .put((req, res) => {
    console.log('/api PUT request', req.body);
    if (!req.body.name) {
      console.log(req.body);
      res.status('418').send('something went wrong, additionally i am a teapot');
    } else {
      writeUser(req.body.name, req.body.zip, req.body.interests, dbSettings)
        .then((result) => {
          console.log(result);
          res.json('Yay! Successful PUT Request'); // simple mode
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  .post((req, res) => {
    console.log('/api post request', req.body);
    if (!req.body.name) {
      console.log(req.body);
      res.status('418').send('something went wrong, additionally i am a teapot');
    } else {
      writeUser(req.body.name, req.body.zip, req.body.interests, dbSettings)
        .then((result) => {
          console.log(result);
          res.send('your request was successful'); // simple mode
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  dbBoot();
});
