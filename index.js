
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URL);
const app = express();
const PORT = 4000;

const events = [
{ "title ": " Jai Birthday", "date": "2022-05-22"},
{ "title ": " Rahul Birthday", "date": "2022-05-31"},
{ "title ": " Business Meet", "date": "2022-05-25"},
{ "title ": " Chit Birthday", "date": "2022-06-09"},
{"title ": " Anniversary", "date": "2022-06-04"},
{ "title ": " Cottage booking", "date": "2022-06-06"},
{ "title ": " Doctor Appointment ", "date": "2022-06-11"},
{ "title ": " Ajay Birthday ", "date": "2022-07-01"},
{ "title ": " Tour start ", "date": "2022-08-07"},
{ "title ": " insurance renewal ", "date": "2022-08-22"},
{ "title ": " Ragu Birthday ", "date": "2022-09-25"},
{ "title ": " Lokesh Birthday ", "date": "2022-10-25"},
{ "title ": " Priya Birthday ","date": "2022-12-02"}
];
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
   await client.connect();
   console.log("Mongo is connected");
   return client;
}
const client = await createConnection();

app.get("/events", function (request, response) {
    response.send(events);
  });
  app.post("/events",async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await client.db("diary_manager").collection("events").insertMany(data);
    response.send(result);
  });
  app.get("/events/:name", async function (request, response){
    console.log(request.params);
    const{ name } = request.params;
    const event = await client
    .db("diary_managing")
    .collection("events")
    .findOne({name:name});
    console.log(event);
    event
    ? response.send(event)
    : response.status(404).send({message: "No Event Find"});
  });

  app.delete("/events/:name", async function (request, response){
    console.log(request.params);
    const{ name } = request.params;
    const result = await client
    .db("diary_managing")
    .collection("events")
    .deleteOne({name:name});
    response.send(result);
  });
  app.put("/events/:name", async function (request, response) {
    console.log(request.params);
    const { name } = request.params;
    const updateData = request.body;
    const result = await client
    .db("diary_managing")
    .collection("events")
    .updateOne({ name:name }, { $set: updateData });
      response.send(result);
    });
  app.listen(PORT, () => console.log(`Server started in ${PORT}`));