#! /bin/bash

export MYSQL_DB="properties"
cd routes && go test --drop=true --test=true