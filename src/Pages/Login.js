import { useState } from 'react'
// import { toast } from 'react-toastify'
import { Navigate, useNavigate,Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import './login.css'
import img from '../assets/logo.png'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { loadlogindata } from '../Redux/permission/loginslice'
// import { useDispatch, useSelector } from 'react-redux';
// import { loadlogindata } from '../../Redux/permission/loginslice'
// import { useSelector, useDispatch } from 'react-redux'
// import { login } from '../features/auth/authSlice'
// // import Spinner from '../components/Spinner'

function Login() {
  const dispatch = useDispatch();
//   const dispatch = useDispatch();
  const [datas,setDatas]=useState()
  const [error,setError]=useState('')
//   const {loginList} = useSelector((state) => state.data1);
//



  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });


  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick1 = async (e) => {
    e.preventDefault();
    
 
const data=await axios.post("http://localhost:8008/user/login/", credentials).then(response=>{
  
    dispatch(loadlogindata(response.data))
    localStorage.setItem("token",JSON.stringify(response.data.token))
    
  Swal.fire(
    {
    text: "Login Successfully",
    icon: "success",
    confirmButtonText: 'Ok',
    confirmButtonColor: '#23BDB8',
  }
    
  ).then(function() {
    window.location = "/home";
})}
).catch((error) => {
  if(error.response) setError(error.response.data);

});
 
}

  return (
    <><div class="uk-card uk-card-default uk-card-body uk-width-1-2@m login">
      <section className='heading'>
        <div className='logo'>
      <img src={img} alt="" />
        </div>
        
        <p className='loginhead'>Login to CompanyName</p>
      </section>
      <span className='span'>{error}</span>
      <section className='form'>
      
        <form >
          <div className='form-group loginform'>
            <input
            
              className='formsinput'
              id="email"
              onChange={handleChange}
              placeholder='Enter your email'
              required="required"
              name='email'
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
            <button class=" loginsubmit" onClick={handleClick1} >Submit</button>
          </div>
          <Link to="/register"><p className='ps'>Create an account</p></Link>
        </form>
      </section>
      </div></>
      
    

  )
}

export default Login
