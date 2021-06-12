#! /bin/bash

export MYSQL_DB="hosts"
cd routes && go test --drop=true