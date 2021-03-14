#!/bin/bash

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/init-certs.sh"

usage() {
  echo "Usage $0 -c command_name -e env_name
Commands : 
	- init
  "
}

is_valid_command() {
  case "$1" in
  'init')
    return 0
    ;;
  esac
  return 1
}

if [ -z "$1" ]; then
  echo "Type the command you want to execute (init), followed by [ENTER]:"
  read CMD
  if is_valid_command "$CMD"; then
    echo "Type the environment used to execute $CMD (local|production), followed by [ENTER]:"
    read ENV
  else
    usage
    exit 1
  fi
fi

while [[ $# > 1 ]]; do
  key="$1"

  case $key in
  -c | --command)
    CMD="$2"
    if ! is_valid_command "$CMD"; then
      usage
      exit 1
    else
      shift
    fi
    ;;
  -e | --env)
    ENV="$2"
    shift
    ;;
  -s | --service)
    SERVICE="$2"
    shift
    ;;
  *)
    usage
    exit 1
    ;;
  esac
  shift
done

if [ "$CMD" == "init" ]; then
  echo "Specify the domain(s) separated by space"
  read DOMAINS
  echo "Specify the email used for LetsEncrypt"
  read EMAIL
  echo "Specify the docker-compose file"
  read COMPOSE_FILE
  if [ -z "$ENV" ]; then
    ENV="staging"
  fi
  init_certs $DOMAINS $EMAIL $ENV $COMPOSE_FILE
else
  echo "Invalid command"
  usage
  exit 1
fi
