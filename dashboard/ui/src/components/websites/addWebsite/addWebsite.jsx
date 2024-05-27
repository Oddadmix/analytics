import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function AddWebsite() {
  const addWebsite = async () => {
    const websiteUrl = document.getElementById('outlined-basic').value;
    try {
      const res = await axios.post('/api/websites', {
        url: websiteUrl,
      });
      alert('Website added');
    } catch (e) {
      alert('Error adding website');
    }
  };

  return (
    <div>
      <h3>Add Website</h3>
      <TextField
        id='outlined-basic'
        label='Website Url'
        variant='outlined'
      />
      <br />
      <Button
        style={{ marginTop: '10px' }}
        onClick={addWebsite}
        variant='contained'
      >
        Add Website
      </Button>
    </div>
  );
}
