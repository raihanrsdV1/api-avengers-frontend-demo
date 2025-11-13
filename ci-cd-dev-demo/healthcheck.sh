#!/bin/bash

APP_URL="http://localhost:3000"
MAX_RETRIES=30
RETRY_COUNT=0

echo "Checking application health..."

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" ${APP_URL}/health)
    
    if [ "$HTTP_STATUS" -eq 200 ]; then
        echo "✅ Health check passed!"
        echo "Response:"
        curl -s ${APP_URL}/health | python3 -m json.tool
        exit 0
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Attempt $RETRY_COUNT/$MAX_RETRIES - Health check failed (HTTP $HTTP_STATUS). Retrying in 2s..."
    sleep 2
done

echo "❌ Health check failed after $MAX_RETRIES attempts"
exit 1