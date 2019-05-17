# IoTHarness

A node script for testing IoT Core ingest over MQTT

## To Use

1. Clone repo
2. Install dependencies
3. Retrieve Certificates from S3
4. Copy certs into this folder
5. `node index.js` and monitor from IoT Core console
6. You can observe the flow via CloudWatch for Lambda and in Dynamo console.

---

Current schema

```javascript
JSON.stringify({
      id: id,
      coordinates: [0, 0],
      Other: "bar"
})
```

If you need to have this modified, please cut an issue in this repo and tag @cmtoomey - I will update and republish shortly.