import React from 'react'
import logo from '../assets/logo.png'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
function Header() {
  const {loginList} = useSelector((state) => state.data1);
  return (
    <div className='header'>
        <div className='head'>
            <div className='imgdiv'>
          <img src={logo} className="logos" alt="" />
          <div className='buttons'>
          {loginList.map((item)=>(<div><p className='titlename titlehead'>
          {item.name}
         </p></div> 
          ))}
          </div>
          </div>
        </div>
    </div>
  )
}

export default Header