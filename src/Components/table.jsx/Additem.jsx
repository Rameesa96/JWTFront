import React from 'react'
import  {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Form, Button, Col, Container } from 'react-bootstrap';
import max from '../../assets/max.webp'
import Swal from 'sweetalert2'
function Additem(props) {
    const [error,setError]=useState('')
    const [credentials, setCredentials] = useState({
        image:undefined,
        name: undefined,
    description: undefined,
    price:undefined,
        
          });
       
          const navigate =useNavigate()
    
        
          const handleChange = (e) => {
            setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
          };
       const handlephoto=(e)=>{
        setCredentials((prev)=>({...prev,image:e.target.files[0]}))
        console.log(e.target.product.files[0])
       }
          const handleClick = async (e) => {
            const token = JSON.parse(localStorage.getItem("token"))
            const config={
                headers:{
                Authorization:`Bearer ${token}`
                }
              }
            e.preventDefault();
            
          const res = await axios.post(`http://localhost:8008/item/`, credentials,config).then(response=>{
            Swal.fire(
                {
                text: "Item Added Successfully",
                icon: "success",
                confirmButtonText: 'Ok',
                confirmButtonColor: '#23BDB8',
              }
                
              ).then(function() {
                window.location = "/home";
            })
          }).catch((error) => {
            if(error.response) setError("Not Authorized User....... Please Login");
          
        });;
          
         
    }
  return (
    <div>
    <div style={{width:"100%"}} className='container'>
       
    <span className='span'>{error}</span>
<Form style={{width:"100%"}} onSubmit={handleClick}>

<Row className='form'>

<Form.Group as={Col} className="mb-3 " id='name' onChange={handleChange}>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" id="name" placeholder="" />
      </Form.Group>
      <Form.Group as={Col} className="mb-1 "  id='description' onChange={handleChange}>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="" id="description" />
      </Form.Group>
      <Form.Group as={Col} className="mb-1 "  id='price' onChange={handleChange}>
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="" id="price" />
      </Form.Group>
    </Row>
      
        
        
      
      <button variant="primary"  type="submit"   className="loginsubmit">
        Submit
      </button>
</Form>
</div>   
   
   
   
  </div>
  )
}

export default Additem