#!/bin/sh

if [ "$DATABASE" = "prog_app" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi
  echo "$DATABASE $SQL_HOST $SQL_PORT"

exec "$@"
