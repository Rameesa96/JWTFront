import React ,{useState} from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios' 
import Row from 'react-bootstrap/Row';
import { Form, Button, Col, Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Navigate, useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';  
import { Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import './edititem.css'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


function Edititem() {
    const location =useLocation()
    
    const itemid = location.pathname.split("/")[2]

    const [credentials, setCredentials] = useState({
      Name: undefined,
      price:undefined,
      description:undefined,
   
         
        });

 const handleChange = (e) => {
            setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
          };
          const token = JSON.parse(localStorage.getItem("token"))
  const config={
      headers:{
      Authorization:`Bearer ${token}`
      }
    }
    const [error,setError]=useState('')
const handleClick = async (e) => {
           
        e.preventDefault();
        const data = await axios.put(`http://localhost:8008/item/edit/${itemid}`, credentials,config).then(response=>{
          Swal.fire(
            {
            text: "Edited Successfully",
            icon: "success",
            confirmButtonText: 'Ok',
            confirmButtonColor: '#23BDB8',
          }
            
          ).then(function() {
            window.location = "/home";
        })
        }).catch((error) => {
          if(error.response) setError("Not Authorized User....... Please Login");
        
      })
       
        
        
    }

    const [data ,setData]=useState('')
   
    React.useEffect(()=>{
      const token = JSON.parse(localStorage.getItem("token"))
      const config={
          headers:{
          Authorization:`Bearer ${token}`
          }
        }
    axios.get(`http://localhost:8008/item/${itemid}`,config).then(response=>{
        setData(response.data)
    }).catch((error) => {
      if(error.response) setError("Not Authorized User....... Please Login");
    
  })
    })
  
  return (
    <section className='customerform'>
        
        <div className='carddiv'>
        
      <Card className='containers'>
    
    {/* <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
            
            </div>
        </div>
    </div> */}
   
   <div class="uk-card-body">
   <p className='loginhead'>Edit Item</p>
   <span className='span'>{error}</span>
   <Form style={{width:"100%"}} >
<Row className='form'>
{/* <Form.Group controlId="formFile" className="mb-3" id='image' onChange={handlephoto}>
        <Form.Label>Image</Form.Label>
        <Form.Control accept=".png, .jpg, .jpeg"
                name="image" type="file" />
     </Form.Group> */}
<Form.Group as={Col} className="mb-3 " id='name' onChange={handleChange}>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" id="name" defaultValue={data.name}  placeholder="" />
      </Form.Group>
      <Form.Group as={Col} className="mb-1 "  id='description' onChange={handleChange}>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="" defaultValue={data.description}  id="description" />
      </Form.Group>
      <Form.Group as={Col} className="mb-1 "  id='price' onChange={handleChange}>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="" id="price" defaultValue={data.price}  />
      </Form.Group>
    </Row>
  </Form>
</div>
  <div class="uk-card-footer">
     <div className="customerformbutton">
     <Link to='/home'><button className='loginsubmit '>Back</button></Link>
     <button className='loginsubmit '  onClick={handleClick}>Save</button>
    </div>
 </div>
    
</Card>
</div></section>
  );
}

export default Edititem