import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { wrapper, store, persistor } from '../store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
         </PersistGate>
      </Provider>
   )
}

export default wrapper.withRedux(MyApp)
