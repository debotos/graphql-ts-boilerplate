# graphql-ts-boilerplate

```
touch .env
```

Fill it with -

```
# .env

# Set it to 'production' when deploying
NODE_ENV=development
PORT=5000

# leave it blank/empty if you don't want to use mongo DB
USE_MONGO_DB=true
MONGO_DB_URI=mongodb://localhost/graphql-ts-boilerplate

POSTGRES_DATABASE=graphql-ts-boilerplate
POSTGRES_DATABASE_USER=postgres
POSTGRES_DATABASE_PASSWORD=

# Fill it only in production time
POSTGRES_DATABASE_URL=

JWT_SECRET=mysupersecretkey
```

Application is checking for an 'x-token' key value pair in the HTTP header to consider as a Authenticate User.
