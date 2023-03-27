#!/bin/sh

envsubst < /container/nats.template.conf > /container/nats.conf
exec nats-server -c /container/nats.conf