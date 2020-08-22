const admin = require('firebase-admin');

let db = admin.firestore();


const cors = require('cors')
const express = require('express')

const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/callback', (req, res) => {
  res.status(200)
})

app.post('/requests/:userId', async (req, res) => {
  const { userId } = req.params
  const { name, referenceId, type, content, address, location, value, status, qrcode } = req.body
  let docRef = db.collection(userId).doc(referenceId);
  const newRequest = await docRef.set({
    status,
    qrcode,
    referenceId,
    name,
    content,
    type,
    address,
    location,
    value,
  });
  return res.json(newRequest)
})

app.get('/requests/:userId', async (req, res) => {
  const { userId } = req.params
  let requests = db.collection(userId);
  const docs = []
  await requests.get()
    .then(snapshot => {
      if (snapshot.empty) {
        return res.json('Nenhum documento foi encontrado.');
      }

      snapshot.forEach(doc => {
        const response = doc.data()
        docs.push(response)
      });
      return res.json(docs)
    })
    .catch(err => {
      return res.json(err)
    });
})
app.get('/requests', async (req, res) => {
  const docs = []
  await db.listCollections()
    .then(snapshot => {
      if (snapshot.empty) {
        return res.json('Nenhum documento foi encontrado.');
      }

      snapshot.forEach(snap => {
        const response = snap['_queryOptions'].collectionId
        docs.push(response)
      });
      return res.json(docs)
    })
    .catch(err => {
      return res.json(err)
    });
})

module.exports.api = app
