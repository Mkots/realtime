#!/bin/sh
set -o allexport; source /container/.env; set +o allexport
envsubst < /container/nats.template.conf > /container/nats.conf
exec nats-server -c /container/nats.conf
