# Netflix Clone

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [How to use](#how-to-use)
   - [Locally](#with-docker)
   - [With Docker](#with-maven)
4. [Credits](#credits)

# Introduction

A Netflix clone for study purposes, you can login with your Google/GitHub account or email.

# Prerequisites

To run locally you need:

- Node.js (20+).
- MongoDB.
- Create an **_.env_** file with the following values:

```
DATABASE_URL=""
PASSWORD_SALT=""
NEXTAUTH_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

# How to use

### Locally

1. Run the following command in order to download the dependencies and create the collections in your MongoDB: **`yarn`** then **`yarn prisma db push`**.
2. Load your Movie collection with movies.json file (or you can create your own movie collection) in your MongoDB.
3. Run the application with: **`yarn dev`** so you can access your **`localhost:3000`**.

### With Docker

- Run the following command: **`docker compose up`**

# Credits

- [Erick Batista Prado](https://github.com/batistaerick)
