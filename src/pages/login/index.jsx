import style from './style/style.module.css'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/users'
import Header from '../../components/header'
import Link from '../../components/Links'
import useApi from '../../helpers/useApi'

export default function Login() {
   const [Users, SetUsers] = useState({ username: '', password: '' })
   const [PlaceHolder, setPlaceHolder] = useState({ Username: 'Username', Password: 'Password' })
   const { isAuth } = useSelector((state) => state.users)

   const refLogin = useRef(null)
   const refWarUser = useRef(null)
   const refWarPass = useRef(null)

   const api = useApi()
   const router = useRouter()
   const dispatch = useDispatch()

   useEffect(() => {
      if (isAuth) {
         router.push('/')
      }
   }, [isAuth])

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

   const goLogin = () => {
      const newHolder = { ...PlaceHolder }
      api.requests({
         method: 'POST',
         url: '/auth',
         data: Users
      })
         .then((res) => {
            const { data } = res.data
            dispatch(login(data.token))
         })
         .catch((error) => {
            console.log('🚀 ~ file: index.jsx ~ line 74 ~ goLogin ~ error', error)
            // if (error.response) {
            //    const message = error.response.data.result.msg
            //    if (message === 'Password Salah') {
            //       newHolder.Password = 'Password Salah'
            //       setPlaceHolder(newHolder)
            //       refWarPass.current.classList.add(style.err)
            //    } else if (message === 'Username tidak terdaftar') {
            //       refWarUser.current.classList.add(style.err)
            //       newHolder.Username = 'Username belum terdaftar'
            //       setPlaceHolder(newHolder)
            //    }
            // }
         })
   }

   return (
      <div className={style.login}>
         <Header></Header>
         <main className={style.login_main}>
            <div className={style.from_container}>
               <div className={style.login_from}>
                  <h1 style={{ fontWeight: 'bold' }}>Lets go inside</h1>
                  <p>Login with youre account to get more feature</p>
                  <div className={style.inpform} onKeyPress={_HandleKeyBoard}>
                     <input
                        type="text"
                        onChange={onChangeInput}
                        name="username"
                        autoComplete="off"
                        onFocus={inputOnFocus}
                        onBlur={inputOnBlur}
                     />
                     <span
                        data-placeholder={PlaceHolder.Username}
                        className="nor"
                        ref={refWarUser}
                     />
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
                     <span
                        data-placeholder={PlaceHolder.Password}
                        className="nor"
                        ref={refWarPass}
                     />
                  </div>
                  <div className={style.botom_txt}>
                     <p>
                        Forgot <Link to="/forgot/pass"> Password </Link> /{' '}
                        <Link to="/forgot/users"> Username </Link>
                     </p>
                  </div>
                  <button
                     className={style.login_btn}
                     defaultValue="Login"
                     onClick={goLogin}
                     ref={refLogin}
                  >
                     <span className="text">Login</span>
                  </button>
                  <div className={style.icons_container}>
                     <a className={`${style.icos} ${style.fb}`} to="#">
                        <i className="icon-social-facebook" />
                     </a>
                     <a className={`${style.icos} ${style.tt}`} to="#">
                        <i className="icon-social-twitter" />
                     </a>
                     <a className={`${style.icos} ${style.gp}`} to="#">
                        <i className="fa fa-google-plus" />
                     </a>
                  </div>
                  <div className={style.botom_txt}>
                     <p>
                        Dont have account? <Link to="/signup"> Sign up! </Link>
                     </p>
                  </div>
               </div>
            </div>
            <div className={style.hero}>
               <div className={style.img_container}>
                  <img
                     src="https://res.cloudinary.com/devops2/image/upload/v1619705957/musicfly/cover_wtwzdn.jpg"
                     alt="cover"
                  />
               </div>
            </div>
         </main>
      </div>
   )
}
