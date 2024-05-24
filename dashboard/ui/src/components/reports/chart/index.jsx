import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

export default function Chart({ websiteId, type, title = 'Chart' }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/reports?websiteId=${websiteId}&type=${type}`)
      .then((response) => {
        // loop over all the data and objects by date
        const events = {};
        response.data.rows.forEach((event) => {
          const date = new Date(event.createdAt).toLocaleDateString();
          if (!events[date]) {
            events[date] = 0;
          }
          events[date] += 1;
        });
        setData(events);
        console.log('Events', events);
      });
  }, []);

  return (
    <>
      <h2>{title}</h2>
      <LineChart
        xAxis={[
          {
            scaleType: 'band',
            data: [...Object.keys(data)],
          },
        ]}
        series={[
          {
            data: [...Object.keys(data).map((item) => data[item])],
          },
        ]}
        width={300}
        height={300}
      />
    </>
  );
}
