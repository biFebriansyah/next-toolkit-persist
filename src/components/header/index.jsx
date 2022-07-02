import style from "./style/out.module.css"
import React from "react"
import { useRouter } from "next/router"
import Link from "../Links"

export default function OutHeader() {
    const router = useRouter()
    return (
        <header className={`${style.my_header} bg-white-only`}>
            <div className={style.my_left}>
                <div className="navbar-brand login-head">
                    {/* <img
                        src="https://res.cloudinary.com/devops2/image/upload/v1619602470/musicfly/brown_xzsh5k.png"
                        alt="logo"
                    /> */}
                    <span className="hidden-nav-xs m-l-sm">Fazztrack</span>
                </div>
            </div>
            <div className={style.my_right}>
                <div className={style.my_btn}>
                    <Link to="/" className={`${style.cos_btn} ${style.bg_false}`}>
                        Explore
                    </Link>
                </div>
                {router.pathname === "/signup" ? (
                    <div className={style.my_btn}>
                        <Link to="/login" className={`${style.cos_btn} ${style.bg_true}`}>
                            Login
                        </Link>
                    </div>
                ) : router.pathname === "/login" ? (
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
