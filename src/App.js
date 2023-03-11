import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './utils/history'
import React, { Suspense } from 'react'
import './assets/reset.css'
const Home = React.lazy(() => import('./pages/home'))
const Login = React.lazy(() => import('./pages/login'))
const SignUp = React.lazy(() => import('./pages/signUp'))

function App() {
  return (
    <Router history={history}>
      <div className='App'>
        <Suspense>
          <Switch>
            <Redirect exact from='/' to='/login'></Redirect>
            <Route path='/login' component={Login}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/signUp' component={SignUp}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
