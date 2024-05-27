import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function Chart({ websiteId, type, title = 'Chart' }) {
  const [data, setData] = React.useState([]);

  const [startDate, setStartDate] = React.useState(dayjs(new Date()));
  const [endDate, setEndDate] = React.useState(dayjs(new Date()));

  React.useEffect(() => {
    axios
      .get(
        `/api/reports?websiteId=${websiteId}&type=${type}&startDate=${startDate}&endDate=${endDate}`
      )
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
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h2>{title}</h2>
      <div>
        <DatePicker
          label='Start Date'
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <DatePicker
            label='End Date'
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </div>
      </div>
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
    </LocalizationProvider>
  );
}
