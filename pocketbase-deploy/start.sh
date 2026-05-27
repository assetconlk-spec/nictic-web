#!/bin/sh
# Create superuser on first run (silently fails if already exists)
./pocketbase superuser create "$PB_SUPERUSER_EMAIL" "$PB_SUPERUSER_PASSWORD" 2>/dev/null || true
# Start PocketBase
exec ./pocketbase serve --http=0.0.0.0:${PORT:-8090} --dir=/pb_data
