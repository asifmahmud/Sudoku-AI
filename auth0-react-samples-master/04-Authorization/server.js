const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const store = require('./store')
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
var multer = require('multer');
let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.json())


const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:messages' ]);
const checkScopesAdmin = jwtAuthz([ 'write:messages' ]);

//multer store images
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, "./Images");
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

//post schema

let schema = buildSchema(`
type User {
  id : String!
  nickname : String!
  avatar : String!
}
type Post {
    id: String!
    user: User!
    caption : String!
    image : String!
}
type Query{
  user(id: String) : User!
  post(user_id: String, post_id: String) : Post!
  posts(user_id: String) : [Post]
}
`);


let userslist = {
  a: {
    id: "a",
    nickname: "Chris",
    avatar: "https://www.laravelnigeria.com/img/chris.jpg"
  },
};

 // Maps id to User object
let postslist = {
  a: {
    a: {
      id: "a",
      user: userslist["a"],
      caption: "Moving the community!",
      image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
    },
    b: {
      id: "b",
      user: userslist["a"],
      caption: "Angular Book :)",
      image:
        "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"
    },
    c: {
      id: "c",
      user: userslist["a"],
      caption: "Me at Frontstack.io",
      image: "https://pbs.twimg.com/media/DNNhrp6W0AAbk7Y.jpg:large"
    },
    d: {
      id: "d",
      user: userslist["a"],
      caption: "Moving the community!",
      image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
    }
  }
};

 // The root provides a resolver function for each API endpoint
 let root = {
  user: function({ id }) {
    return userslist[id];
  },
  post: function({ user_id , post_id }) {
    return postslist[user_id][post_id];
  },
  posts: function({ user_id }){
    return Object.values(postslist[user_id]);
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

var pusher = new Pusher({
  appId: '573248',
  key: '0d56ce7f6de4e5484e06',
  secret: '27a8035cdf8f5f89773a',
  cluster: 'eu',
  encrypted: true
});


let multipartMiddleware = new Multipart();

    // trigger add a new post 
    app.post('/newpost', multipartMiddleware, (req,res) => {
      // create a sample post
      let post = {
        user : {
          nickname : req.body.name,
          avatar : req.body.avatar
        },
        image : req.body.image,
        caption : req.body.caption
      }

      // trigger pusher event 
      pusher.trigger("posts-channel", "new-post", { 
        post 
      });

      return res.json({status : "Post created"});
    });


app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', checkJwt, checkScopes, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
});

app.post('/api/admin', checkJwt, checkScopesAdmin, function(req, res) {
  res.json({ message: "Hello from an admin endpoint! You need to be authenticated and have a scope of write:messages to see this." });
});

app.post("/api/Upload", function (req, res) {
  upload(req, res, function (err) {
      if (err) {
          return res.end("Something went wrong!");
      }
      return res.end("File uploaded sucessfully!.");
  });
});

//test local database
app.post('/api/createUser', function (req, res) {
  store.createUserIfNotExists({
      username: req.body.username,
      email: req.body.email
    })
    .then(() => res.sendStatus(200))
})


app.listen(3001);
console.log('Server listening on http://localhost:3001. The React app will be built and served at http://localhost:3000.');