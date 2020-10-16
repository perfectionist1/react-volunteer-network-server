const  express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hey how r u Node?');
})

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:Bangladesh331551@cluster0.plevr.mongodb.net/volunteer-network?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteer-network").collection("helps");
  // perform actions on the collection object
    const volunteerHelpItems = {name: "Collect stuffed animal", pic: "stuffedAnimals.png"}
    collection.insertOne(volunteerHelpItems)
    .then( result => {
        console.log('One item added successfully');
    })
  //console.log("DB connected!!");

  //client.close();
});



app.listen(4000, () => console.log('Listening port 4000'));
