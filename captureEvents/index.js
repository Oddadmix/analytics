const amqp = require('amqplib/callback_api');

amqp.connect(
  'amqps://ofsrnljx:b8E5UbvcIfR365JuOsDLmxfR30Y97yVU@beaver.rmq.cloudamqp.com/ofsrnljx',
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const queue = 'events';
      const msg = 'Hello world';

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(' [x] Sent %s', msg);

      connection.close();
    });
  }
);
