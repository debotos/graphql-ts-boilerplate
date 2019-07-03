# graphql-ts-boilerplate

```
touch .env
```

Fill it with -

```
# .env
NODE_ENV=development
PORT=5000

# leave it blank/empty if you don't want to use mongo DB
USE_MONGO_DB=true
MONGO_DB_URI=mongodb://localhost/graphql-ts-boilerplate

POSTGRES_DATABASE=graphql-ts-boilerplate
POSTGRES_DATABASE_USER=postgres
POSTGRES_DATABASE_PASSWORD=

JWT_SECRET=mysupersecretkey
```

Application is checking for an 'x-token' key value pair in the HTTP header to consider as a Authenticate User.
