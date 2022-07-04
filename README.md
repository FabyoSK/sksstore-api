## Overview 

This API is built using Node and Express, we are using PostgreSQL as database and Redis as in-memory database.

I'm using Express, because it's provide a minimal and an unopinionated API.

Redis is being used to cache the response from the both provider's APIs, so we don't need to fetch the products on their API every time, for this demo the expiration time for this cache is one hour, but in production I recommend a expiration time of 12 hours, since the product catalog will not change that much.

PostgreSQL is used as main database, which is used to store the user's data, sessions, and orders, I'm not storing the products, because their are being provided by an external API, and if a product changes my API will keep the outdated value, and I fetching them on the api and sending them to the client, also I'm using redis to improve performance. 

API was designed to be minimal as possible, I didn't implement any pagination because I'm not storing the products from the external APIs, so what I'm doing to search is getting the product list and then I am filtering the products in the a memory. I know this is not the best approach, but to solve this problem the what could be done is provide an Admin panel that let the providers add their products on API with that I can have plain control of the data and then I can query on my own database

## Run the API
To run the API you must simply run the following command
```bash
cp .env.example .env
```
```base
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

The API will be running on port 3333 :rocket: