# Backend Logic

Content Type: Guide, Tools
Finished: No

## Backend Logic

> We first start a basic express server
> 

```jsx
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.urlencoded({
    extended: true
}))
```

> We create an empty global database
> 

```jsx
let global_db = {};
```

So the catch here is if we use the usual way of opening html files, it won’t work because we haven’t connected our backend to it.

Instead of opening the html file, we make the client(browser) interact with the server first by running our `tasks.js` file.

Then we basically feed the client the html file we need to display as soon as the connection is made using a **GET** method.

```jsx
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
```

path.join gets the current directory automatically and proceeds to locate the file in our folder through the filename.

This was whole process was done because by letting the backend feed the file directly, we’ll be able to capture the form output easily because we are writing `action="/write"` so express will able to easily capture the output because we just have to give `app.post` the path of `/write` as well and since the submit button on the html file basically suffixes the action path to the current path. What this means is that the original path i.e. [localhost:3000](http://localhost:3000) just submits to localhost:3000/write which is convenient because our post method also expects input in a similar manner.

This makes connection between client and server much easier rather than the alternate method where we would usually open the index.html file because in that case the backend wouldn’t have been readily connected to the server code but in our case our backend is the one who’s sending the html file to the client for it to display it.

> Next, we handle post requests like this
> 

```jsx
app.post('/write', (req, res) => {
    const taskNum = Object.keys(global_db).length + 1;
    const formData = req.body;
    global_db[taskNum] = formData;
    console.log(global_db);
    res.redirect('/');
})
```

We have to nest the obtained form data object to a task number so that we can create track of it. We call Object.keys() to get the keys in the form of an array and use the .length property of arrays to get the number of keys. We increment the value to display the task number in the convention we have chosen (1, 2, 3, 4…….).

At the end of it we redirect it to localhost:3000 so that we can keep adding more tasks

> Finally, we make backend listen to the port
> 

```jsx
app.listen(port, () => {
    console.log(`Started listening on port: ${port}`);
})
```
