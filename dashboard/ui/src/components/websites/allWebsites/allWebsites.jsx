import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function AllWebsites() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const res = axios.get('/api/websites').then((res) => {
      setWebsites(res.data);
    });
  }, [setWebsites]);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {websites.map((website) => (
        <ListItem
          key={website.id}
          disableGutters
        >
          <ListItemText primary={`${website.url}`} />
          <textarea
            value={`<script type="text/javascript">const WEBSITE_ID="${website.id}";</script><script type="text/javascript" src="http://localhost:3000/assets/index.js"></script>`}
          ></textarea>
        </ListItem>
      ))}
    </List>
  );
}
