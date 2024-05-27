const amqp = require('amqplib/callback_api');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(cors());

amqp.connect(process.env.MQ_URL, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    console.log('Connected to RabbitMQ');

    const queue = 'events';
    const msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: true,
    });

    app.post('/event', (req, res) => {
      const { type, userAgent, ip, browserId, websiteId } = req.body;
      const event = {
        type,
        userAgent,
        ip,
        browserId,
        websiteId,
        createdAt: new Date(),
      };
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(event)));

      console.log(' [x] Sent %s', JSON.stringify(event));
      res.send('Event sent');
    });

    process.on('beforeExit', () => {
      connection.close();
    });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
