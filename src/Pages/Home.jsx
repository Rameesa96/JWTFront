import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Home.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import logo from '../assets/logo.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Additem from '../Components/table.jsx/Additem';
import DataTable from '../Components/table.jsx/Tabs';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from '../Components/Header';
import { removelogin } from "../Redux/permission/loginslice"
import { useDispatch, useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(1);
  const dispatch1=useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const Logout=()=>{
  dispatch1(removelogin())
  localStorage.removeItem("token")
  window.location='/'
}
const {loginList} = useSelector((state) => state.data1);

  return (
    <div>
    <Box className='tab'
      sx={{ flexGrow: 1, bgcolor: 'white', display: 'flex'  }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        className="tabs"
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ boxShadow:"5px 5px 5px 5px rgb(86, 85, 85)" }}
      >
        <div className='imgdives'>
          <img src={logo} className="logos" alt="" />
         {loginList.map((item)=>(<div><p className='titlename'>
          {item.name}
         </p></div> 
          ))}
        </div>
        <Tab className='title1' icon={<ListIcon style={{color:'#3f6ad8'}} />} iconPosition="start" label="Item list" {...a11yProps(0)} />
        <Tab className='title' icon={<AddBoxIcon style={{color:'#3f6ad8'}} />} iconPosition="start" label="Item Add" {...a11yProps(1)} />

        <button className='titles' onClick={Logout}><LogoutIcon style={{color:'#3f6ad8',cursor:'pointer'}}/> Logout </button>
      </Tabs>
      <div className="panel">
      <TabPanel value={value} index={0} >
     
      </TabPanel>
      <TabPanel value={value} index={1} >
      <DataTable/>
      </TabPanel>
      <TabPanel value={value} index={2}>
    <Additem/>
      </TabPanel>
      
      </div>
  </Box>
      <div className='mobile'>
        <Header/>
      <Accordion className='accord'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className='textaccord'><ListIcon style={{color:'#3f6ad8',fontSize:"25px",marginLeft:"10px"}} /> Item List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <DataTable/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='accord'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className='textaccord' align='center'><AddBoxIcon style={{color:'#3f6ad8',fontSize:"25px",marginLeft:"10px"}} /> Add Item</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           <Additem/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='accord'>
        <AccordionSummary
          onClick={Logout}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className='textaccord' align='center'><LogoutIcon style={{color:'#3f6ad8',fontSize:"25px",marginLeft:"10px"}} />Logout</Typography>
        </AccordionSummary>
       
      </Accordion>
      </div>
    </div>
  );
}
