
import React,{Component} from  'react'
import {Button, message} from 'antd'


import {HashRouter,BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {
    testFn=()=>{
        message.success('ok')
    }
    render(){
        return <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
    }
}