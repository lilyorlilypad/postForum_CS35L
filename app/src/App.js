import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './utils/history'
import React, { Suspense } from 'react'
import './assets/reset.css'
const Home = React.lazy(() => import('./pages/home'))
const Login = React.lazy(() => import('./pages/login'))
const SignUp = React.lazy(() => import('./pages/signUp'))
const Product = React.lazy(() => import('./pages/product'))
const SearchResult = React.lazy(() => import('./pages/searchResultPage'))

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
            {<Route path='/product/:id' render={(props) => <Product {...props} key={props.match.params.id} />} /> /* <Route path='/product' component={Product}></Route> */}
            <Route path='/search' component={SearchResult}></Route> {/* Might need to change this later */}
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
