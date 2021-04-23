# tailwind-jit-mern starter

this is a dev stack for using tailwindcss 2.1 with JIT compilation
in a MERN stack with (p)react, node and a no-sql database
to be deployed on the cloud.

## requirements

- git
- node + yarn (or npm)
- docker + docker-compose
- shell (bash / WSL)
- browser + curl (or postman) for manual testing

## getting started

```
./install.sh
./start.sh
cd server
docker-compose up
yarn watch
```

### starting the client app

```
cd client && yarn install && yarn start
```

starts a live preview server on

(http://localhost:8080)

### starting the server

```
cd server && yarn install && yarn start
```

(or `yarn watch` for a development setup reloading on file change)

Testing a static server post route on the command line:

```
curl -X POST --data '{"message": "bla"}' -H "Content-Type: application/json"  http://localhost:9000/v0/hello/Ingo
```

Testing an API route using MongoDB:

```
curl -X GET  http://localhost:9000/api/books
```

### starting the database

```
cd server && docker-compose up
```

## TODO

- [ ] evaluate, setup, test components
- [ ] make sure components can communicate at all            => tag as basic proof of concept
- [ ] refine use cases, hot reloading, performance, security => tag as basic local setup
      (tailwind hot reload, define own style component, a11y and performance audit)
      (node typescript and sanitizing, security audit)
- [ ] make sure setup can be deployed e.g. in AWS cloud      => tag as basic setup
- [ ] optimize local setup for easier understanding and maintenance (monorepo)
- [ ] refine testing and documentation                       => tag as full starter setup
      (fork demo project from starter setup)
      (backport important updates made in demo project)
      (document and link demo project on the web)

## why not XYZ

Originally intended to use tailwind with create-react-app,
after trying to solve conflicts and incompatibilities,
I rebased the starter on [retinafunk's tailwind-jit-starter](https://github.com/retinafunk/tailwind-jit) and decided to drop old technology like webpack in favour of smaller, more elegant solutions.

## tailwind

read more here : https://blog.tailwindcss.com/tailwindcss-2-1
and

I added configs bor tailwindcss , via postcss and a live reload dev server
just

All is configured for you you ready to go in 2 minutes.

Start with cloning the repository and in Terminal :

> yarn or >npm install

then :

A script to compile twailwindcss with postcss

> yarn dev

and to have a live reload local dev server for better and faster deb experience

> yarn serve

Change the Taiwind css classes in /build/index.html to see in action

Visit http://localhost:8080/ in your Browser

HAVE FUN!

