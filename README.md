# Getting Started with Banks App

## Step 1

In the project directory run:

### `yarn install`

## Step 2

Then in the project directory run:

### `yarn run install:client`

This command will install all the needed dependencies to the client.

## Step 3

Then in the project directory run:

### `yarn run install:server`

This command will install all the needed dependencies to the server.

## Step 4

This project uses postgresql database to store data.\
Now you need to tell the server the URL that points to your own database.

Enter `server` directory and create a file called `.env`. This file store the environment variable which sets the url to your database.\
The example of the URL variable:

```javascript
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Enter in the `.env` file URL to your postgresql database as shown above.

## Step 5

Now you need to migrate project data models to your database.\
In order to do that, run this command from the project root directory:

### `yarn run migrate`

## Step 6

Now your project is good to go.

Run this command in the project directory to start:

### `yarn run start`

Your client is run on [http://localhost:3000](http://localhost:3000)

You can explore the server on [http://localhost:5000/graphql](http://localhost:5000/graphql)


