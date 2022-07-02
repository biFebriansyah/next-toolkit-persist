import style from './style/style.module.css'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/header'
import useApi from '../../helpers/useApi'

function Signup() {
   const [Users, SetUsers] = useState({ username: '', password: '', role: 'users' })
   const [PlaceHolder, setPlaceHolder] = useState({ Username: 'Username', Password: 'Password' })

   const refLogin = useRef(null)
   const refWarUser = useRef(null)
   const refWarPass = useRef(null)

   const router = useRouter()
   const api = useApi()

   const _HandleKeyBoard = (e) => {
      if (e.key === 'Enter') {
         goLogin()
      }
   }

   const onChangeInput = (event) => {
      event.preventDefault()
      const data = { ...Users }
      data[event.target.name] = event.target.value
      SetUsers(data)
   }

   const inputOnFocus = (event) => {
      const newHolder = { ...PlaceHolder }
      if (event.target.name === 'username') {
         newHolder['Username'] = 'Username'
         setPlaceHolder(newHolder)
         refWarUser.current.classList.remove(style.err)
      } else {
         newHolder['Password'] = 'Password'
         setPlaceHolder(newHolder)
         refWarPass.current.classList.remove(style.err)
      }
      event.target.classList.add(style.focus)
   }

   const inputOnBlur = (event) => {
      if (event.target.value === '') {
         event.target.classList.remove(style.focus)
      }
   }

   const pushData = () => {
      const newHolder = { ...PlaceHolder }
      api.requests({
         method: 'POST',
         url: '/users',
         data: Users
      })
         .then((res) => {
            router.push('/login')
         })
         .catch((error) => {
            if (error.response) {
               const message = error.response.data.result.msg
               if (message === 'username sudah terdaftar') {
                  refWarUser.current.classList.add(style.err)
                  newHolder.Username = 'Username sudah terdaftar'
                  setPlaceHolder(newHolder)
               }
            }
         })
   }

   return (
      <div className={style.Forgot}>
         <Header></Header>
         <div className={style.main}>
            <div className={style.from_container}>
               <div className={style.desc}>
                  <h1 style={{ fontWeight: 'bold' }}>Register Account</h1>
                  <p>Create new account and join with us!</p>
               </div>
               <div className={style.inpform} onKeyPress={_HandleKeyBoard}>
                  <input
                     type="text"
                     onChange={onChangeInput}
                     name="username"
                     autoComplete="off"
                     onFocus={inputOnFocus}
                     onBlur={inputOnBlur}
                  />
                  <span data-placeholder={PlaceHolder.Username} className="nor" ref={refWarUser} />
               </div>
               <div className={style.inpform} onKeyPress={_HandleKeyBoard}>
                  <input
                     type="password"
                     onChange={onChangeInput}
                     name="password"
                     autoComplete="off"
                     onFocus={inputOnFocus}
                     onBlur={inputOnBlur}
                  />
                  <span data-placeholder={PlaceHolder.Password} className="nor" ref={refWarPass} />
               </div>
               <button
                  className={style.login_btn}
                  defaultValue="Login"
                  onClick={pushData}
                  ref={refLogin}
               >
                  <span className="text">Register</span>
               </button>
            </div>
         </div>
      </div>
   )
}

export default Signup
