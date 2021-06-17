#! /bin/bash

for i in {0..5}; do
	node scripts/seed/records.js
	sleep 2
done

echo "Database seeded!"