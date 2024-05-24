import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Paper } from '@mui/material';
import Chart from '../../reports/chart';

export default function AllWebsites() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const res = axios.get('/api/websites').then((res) => {
      setWebsites(res.data);
    });
  }, [setWebsites]);

  return (
    <>
      {websites.map((website) => (
        <Grid
          item
          xs={12}
        >
          <h2>{website.url}</h2>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <textarea
              value={`<script type="text/javascript">const WEBSITE_ID="${website.id}";</script><script type="text/javascript" src="http://localhost:3002/assets/index.js"></script>`}
            ></textarea>
          </Paper>
          <Paper sx={{ p: 2, m: 1, display: 'flex', flexDirection: 'column' }}>
            <Chart
              websiteId={website.id}
              type={'0'} //0 is View
              title='View Report'
            />
          </Paper>
          <Paper sx={{ p: 2, m: 1, display: 'flex', flexDirection: 'column' }}>
            <Chart
              websiteId={website.id}
              type={'1'} //1 is Click
              title='Clicks Report'
            />
          </Paper>
        </Grid>
      ))}
    </>
  );
}
