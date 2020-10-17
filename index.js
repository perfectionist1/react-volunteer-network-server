const  express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:Bangladesh331551@cluster0.plevr.mongodb.net/volunteer-network?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const volunteerDetails = client.db("volunteer-network").collection("helps");
  
    // const volunteerHelpItems = {name: "Collect stuffed animal", pic: "stuffedAnimals.png"}
    // volunteers.insertOne(volunteerHelpItems)
    // .then( result => {
    //     console.log('One item added successfully');
    // })

    app.post('/volunteerItem', (req, res) => {
        const volunteer = req.body;
        volunteerDetails.insertOne(volunteer)
        .then( result => {
            res.send(result.insertedCount > 0)
        })     
        console.log(volunteer);   
    })

    app.get('/volunteerItem', (req, res) => {
        volunteerDetails.find({})
        .toArray( (err, documents) => {
            res.send(documents);
        })
    })

    app.get('/', (req, res) => {
    res.send('Hey, how are you Node?');
    })



  //client.close();
});



app.listen(4000, () => console.log('Listening port 4000'));
