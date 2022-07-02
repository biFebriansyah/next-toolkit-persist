import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const withAuth = (Component) => {
   return (props) => {
      const { isAuth } = useSelector((state) => state.users)

      if (!isAuth) {
         return <Navigate to="/" />
      }

      return <Component {...props} />
   }
}

export default withAuth
