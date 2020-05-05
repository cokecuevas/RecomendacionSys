#!/bin/sh
#source venv/bin/activate
flask db upgrade
#flask translate compile
exec gunicorn -w 2 -b :5090 --access-logfile - --error-logfile - app:app --reload