import { useState } from 'react'
// import { toast } from 'react-toastify'
import { useNavigate ,Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import './login.css'
import img from '../assets/logo.png'
import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux';
// import { loadlogindata } from '../../Redux/permission/loginslice'
// import { useSelector, useDispatch } from 'react-redux'
// import { login } from '../features/auth/authSlice'
// // import Spinner from '../components/Spinner'

function Register() {
  
//   const dispatch = useDispatch();
  const [datas,setDatas]=useState()
  
//   const {loginList} = useSelector((state) => state.data1);
//



  const [credentials, setCredentials] = useState({
    email: undefined,
    name:undefined,
    password: undefined,
  });
  const [error,setError]=useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
 
const data=await axios.post("http://localhost:8008/user/", credentials).then(response=>{
 
    Swal.fire(
      {
      text: "Account Created Successfully",
      icon: "success",
      confirmButtonText: 'Ok',
      confirmButtonColor: '#23BDB8',
    }
      
    ).then(function() {
      window.location = "/";
  })
  
  
}).catch((error) => {
  if(error.response) 
  {
   setError(error.response.data)
  }

});;

}

  return (
    <><div class="uk-card uk-card-default uk-card-body uk-width-1-2@m login">
      <section className='heading'>
        <div className='logo'>
      <img src={img} alt="" />
        </div>
        <h5>
         
        </h5>
        <p className='loginhead'>Sign Up to CompanyName</p>
      </section>

      <section className='form'>
        <form >
        <span className='span'>{error}</span>
          <div className='form-group loginform'>
            <input
            
            className='formsinput'
              id="email"
              onChange={handleChange}
              placeholder='Enter your email'
              required="required"
            />
          </div>
          
          <div className='form-group loginform'>
            <input
            
            className='formsinput'
              id="name"
              onChange={handleChange}
              placeholder='Enter your name'
              required="required"
            />
          </div>
          <div className='form-group loginform'>
            <input
              type='password'
              className='formsinput'
              id='password'
              name='password'
             
              onChange={handleChange}
              placeholder='Enter password'
              required="required"
            />
          </div>
          <div className='form-group'>
            <button class="loginsubmit" onClick={handleClick} >Create Account</button>
          </div>
          <p className='ps'>Have an account?<Link to='/'>Sign in</Link></p>
        </form>
      </section>
      </div></>
      
    

  )
}

export default Register
