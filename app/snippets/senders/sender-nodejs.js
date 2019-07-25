const agSender = require('unifiedpush-node-sender');

const settings = {
  url: "{{ contextPath }}",
  applicationId: "{{ app.pushApplicationID }}",
  masterSecret: "{{ app.masterSecret }}"
};

const message = {
  alert: "Hello from the Node.js Sender API!"
};

const options = {
  config: {
    ttl: 3600
  }
};

agSender(settings).then((client) => {
  client.sender.send(message, options).then((response) => {
    console.log('success', response);
  }).catch((error) => {
    console.log('error', error);
  })
});
