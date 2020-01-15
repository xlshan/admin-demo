import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../../pages/home/home'
import Category from '../../pages/category/category'
import Product from '../../pages/product/product'
import './admin.less'

const { Footer, Sider, Content } = Layout


export default class Admin extends Component {
    render() {
        let user = memoryUtils.user

        if (!user || !user._id) {
            // 自动跳转render中
            return <Redirect to="/login" />   //render中跳转
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ backgroundColor: 'white', margin: '20px' }}>
                        <Route

                            path='/home'

                            component={Home} />

                        <Route

                            path='/category'

                            component={Category} />

                         <Route

                            path='/product'

                            component={Product} />

                       {/* <Route

                            path='/role'

                            component={Role} />

                        <Route

                            path='/user'

                            component={User} />

                        <Route

                            path='/charts/bar'

                            component={Bar} />

                        <Route

                            path='/charts/line'

                            component={Line} />

                        <Route

                            path='/charts/pie'

                            component={Pie} />

                        <Redirect

                            to='/home'

                        />*/}
                    </Content>
                    <Footer
                        style={{ textAlign: 'center', color: '#aaaaaa' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>

                </Layout>
            </Layout>
        )
    }
}