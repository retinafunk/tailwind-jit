#!/bin/bash
set -e;

"${mongo[@]}" "books" <<-EOJS
  db.createUser({
    user: 'testuser',
    pwd: 'testpw',
    roles: [ { role: 'readWrite', db: 'books' } ]
    })
EOJS
