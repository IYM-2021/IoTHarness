var awsIot = require("aws-iot-device-sdk");

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
//These keys can be retrieved from S3
var device = awsIot.device({
  keyPath: "../local_IoT_Test/newCerts.private.key",
  certPath: "../local_IoT_Test/newCerts.cert.pem",
  caPath: "../local_IoT_Test/AmazonRootCA1.pem",
  clientId: "testHarness",
  host: "a1f5ieskd1ka9e-ats.iot.us-east-1.amazonaws.com"
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device.on("connect", function() {
  console.log("connected");
  //Comment this out to not subscribe
  // device.subscribe("assetingest");
});

device.on("reconnect", () => {
  console.log("reconnected");
});

//Uncomment to see the feed from the stream
// device.on("message", function(topic, payload) {
//   console.log("message", topic, payload.toString());
// });

setInterval(() => {
  console.log(`Publishing:${Math.floor(Date.now() / 1000)}`);
  device.publish(
    //* This is your channel - change this to align with the IoT Core ingestion channel
    "assetingest",
    //* This is your data payload, this will need to get aligned with the Asset Tracking Infrastructure
    //* Tentative Schema should be
    //* {id: id, coordinates: [], metric1: foo, metricN: bar, timestamp: epoch,}
    //* Ine metric per key
    //* ID is the primary query key for Dynamo
    JSON.stringify({
      watchPower: null,
      radarBattery: null,
      pcrr: null,
      totalVehicles: null,
      palt: null,
      hemoTotal: null,
      hemoPercent: null,
      watchBattery: null,
      watchSpeed: 0.195945,
      watchAltitude: 243.484406,
      aeroBattery: null,
      id: "5555",
      enduranceZone: null,
      ptot: null,
      watchHeartRate: 62,
      watchPressure: 100443.132812,
      cda: null,
      intervalZone: null,
      pacc: null,
      watchHeading: 0.129303,
      coordinates: [-88.278449, 43.059163],
      watchLocationQuality: 4,
      eqBreathingRate: -1,
      watchCadence: 0,
      pair: null,
      eqCoreTemp: -1,
      eqSkinTemp: 25,
      eqHeartRate: 0,
      aeroPressure: null,
      androidBattery: 1,
      watchTemperature: 23.030001,
      mo2Battery: null,
      timestamp: Math.floor(Date.now() / 1000),
      semTimestamp: null,
      watchTimestamp: null
    })
  );
}, 5000);
