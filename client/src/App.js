import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup'
import Menu from './components/homepage/Menu'
import Home from './components/homepage/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
