const express = require("express");
const axios = require("axios");
const PORT = 3030;
const app = express();

const url = `https://jsonplaceholder.typicode.com/todos`;
app.get("/api", async (req, res) => {
  axios
    .get(url)
    .then((event) => {
      const data = event.data.filter((item) => {
        return item.completed === false;
      });
      res.json(data);
    })
    .catch((error) => console.log(error));
});

app.delete("/api/:userParams", (req, res) => {
  const userID = req.params.userParams;
  axios.delete(`${url}/${userID}`).
  then(() => {
    res.send("Success!")
  }).
  catch((error) => console.log(error))
});

app.put("/api/:userParams", (req, res) => {
  const userID = req.params.userParams.id;
  axios.delete(`${url}/${userID}`).
  then((event) => {
    res.send('Success!')
  }).
  catch((error) => console.log(error))
});

app.post("/api/:userParams", (req, res) => {
  let body = JSON.stringify(req.params.userParams);
  axios.post(url, body).then(() => console.log('Success!')).catch(() => console.log('Error!'))
});

app.get("/api/:userParams", async ({params: {userParams}}, res) => {
  axios
    .get(`${url}?title=${userParams}`)
    .then((event) => {
      res.json(event.data);
    })
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`You're live on PORT ${PORT} 🔗🚀`);
});
