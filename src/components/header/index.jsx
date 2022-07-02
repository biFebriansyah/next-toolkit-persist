import style from './style/out.module.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Link from '../Links'

export default function OutHeader() {
   const { pathname } = useRouter()
   const { isAuth, data } = useSelector((state) => state.users)

   return (
      <header className={`${style.my_header} bg-white-only`}>
         <div className={style.my_left}>
            <div className="navbar-brand login-head">
               <span className="hidden-nav-xs m-l-sm">Fazztrack</span>
            </div>
         </div>
         <div className={style.my_right}>
            {!isAuth && pathname === '/' ? (
               <>
                  <div className={style.my_btn}>
                     <Link to="/login" className={`${style.cos_btn} ${style.bg_false}`}>
                        Login
                     </Link>
                  </div>
                  <div className={style.my_btn}>
                     <Link to="/signup" className={`${style.cos_btn} ${style.bg_true}`}>
                        Daftar
                     </Link>
                  </div>
               </>
            ) : (
               <>
                  <div className={style.my_btn}>
                     <Link to="/" className={`${style.cos_btn} ${style.bg_false}`}>
                        Explore
                     </Link>
                  </div>
                  {isAuth ? (
                     <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                           {data.Username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                           <Dropdown.Item>Profile</Dropdown.Item>
                           <Dropdown.Item>Setting</Dropdown.Item>
                           <Dropdown.Item>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  ) : null}
               </>
            )}
            {pathname === '/signup' ? (
               <div className={style.my_btn}>
                  <Link to="/login" className={`${style.cos_btn} ${style.bg_true}`}>
                     Login
                  </Link>
               </div>
            ) : pathname === '/login' ? (
               <div className={style.my_btn}>
                  <Link to="/signup" className={`${style.cos_btn} ${style.bg_true}`}>
                     Daftar
                  </Link>
               </div>
            ) : null}
         </div>
      </header>
   )
}
