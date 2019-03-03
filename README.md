# MERN-Stack

MERN stack Social Devloper apps by
Brad Traversy
[Traversy Media](http://www.traversymedia.com)

# DevConnector

> Small social network app built with the MERN stack. This is part of my "MERN Stack Front To Back" Udemy course

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a key.js in the server config folder with

```
module.exports = {
  URI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```

You need to register this application on github. to get clientId and secretId.
[register here](https://github.com/settings/applications/new)

You will need to create a key.js in the client utils folder.

```
export const clientId= <your_id>;
export const secretId= <your_secret_id>;


```

## App Info

### Author

Lokpati Tiwari

### Version

1.0.0

### License

This project is licensed under the MIT License
