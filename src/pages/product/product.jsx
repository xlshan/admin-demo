import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../product/home'
import AddProduct from '../product/addProduct'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={Home} exact></Route>
                <Route path='/product/add' component={AddProduct}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}