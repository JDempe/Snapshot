import React from 'react';
import PhotoList from '../components/PhotoList';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './Personal.scss';

const Personal = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container personalContaienr" sx={{ width: 1 }}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
        </Tabs>
      </Box>
      {value === 0 && <PhotoList />}
      {value === 1 && <PhotoList />}
    </div>
  );
};

export default Personal;
