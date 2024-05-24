import express from 'express';
import Event from '../models/event.js';

const router = express.Router();

router.get('/api/reports', async (req, res) => {
  const websiteId = req.query.websiteId;
  const type = req.query.type;
  const events = await Event.findAndCountAll({
    where: {
      websiteId,
      type,
    },
  });
  res.json(events);
});

export default router;
