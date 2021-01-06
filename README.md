# Ski with me

## What is the goal?

I want to go skiing but most of my friends who ski are in Romania.

It would be great if I there would be a directory where I look up skies/snowboarders who go to/live close to a specific resort and message them to pair up for a few ski days.

> **Main goal:** connect more advance skiers/snowboarders with each other soe they can go ski together.

## When? (Situation)

When you want to go skiing/snowboarding in a specific place but none of your friends cand join you or you are new in a town with no skier/boarder friends and would like some company.

You then go to this database and look for buddies. In a way it's an app for ski/snowboard hangouts.

## So I can? (Expected outcome)

Fomd someone or more people to go skiing/snowboarding with.

---

## What info will be needed in the profiles?

- Name
- Ski / Snowboard / Both
- Level: Beginner, Mid, Advance, Freelance, Pro, Offpist.
- About (short description)
- Contact info: Email
- Contact info: Phone (optional)
- Location: add resort that are around you
- Langages spoken

## Search functionality:

Search based on:

- Resort
  Filter by:
- Ski/Snowboard/Both
- Level
- Language

## Nice to have:

Add an option to mark as favorite people you'd like to go ski/snowboard with.

Would like to have something similar to [Coding Coach](https://mentors.codingcoach.io/)

## Instructions for running locally

### Database migrations

The project relies on a running MySQL database.  
Docker can be used to have a running instance on the local machine.
Given that Docker is installed and running, the following command will download MySQL image and run it:

```bash
docker run -p 3306:3306 --name sky-with-me \
-e MYSQL_ROOT_PASSWORD=password \
-e MYSQL_DATABASE=skywithme \
-d mysql:latest
```

Given [to this thread](https://github.com/mysqljs/mysql/issues/2046) we need to do one more thing to allow to connect unsafely to MySQL locally (just for development purposes).  
The following commands connect us to the Docker container with MySQL instance running:

```bash
docker exec -it sky-with-me /bin/bash
mysql -u root -p # it's "password" from MYSQL_ROOT_PASSWORD
```

```sql
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
```

After this changes you should be able to create a `.env` file with the following content:

```
DB_HOST=0.0.0.0
DB_USER=root
DB_PASS=password
DB_NAME=skywithme
```

If everything was successful then the command `npm run migrate` should execute without errors.
