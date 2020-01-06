import React, { Component } from 'react'
import { Link, withRouter, Switch } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuConfig from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'

export default class LeftNav extends Component {
    getData2 = (data) => {
        if (data) {
            return data.reduce((pre, item) => {
                if (item.children) {
                    console.log(pre.children)
                    pre.push((<Menu.SubMenu key={item.key} title={
                        <Link to={item.key}>
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    }>
                        {this.getData2(item.children)}
                    </Menu.SubMenu>))
                } else {
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }




                return pre

            }, [])

        }
    }
    getData = (data) => {
        if (data) {
            return (
                data.map(item => {
                    if (item.children) {
                        return (
                            <Menu.SubMenu key={item.key} title={
                                <Link to={item.key}>
                                    <span>
                                        <Icon type={item.icon} />
                                        <span>{item.title}</span>
                                    </span>
                                </Link>
                            }>
                                {this.getData(item.children)}
                            </Menu.SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key={item.key}>
                                <Link to={item.key}>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </Link>
                            </Menu.Item>)
                    }

                })
            )
        }
    }
    render() {
        return (
            <div className="left-nav">
                <Menu mode="inline" theme="dark">
                    {
                        this.getData2(menuConfig)
                    }
                </Menu>
            </div>
        )
    }
}