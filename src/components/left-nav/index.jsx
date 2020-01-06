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
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }>
                        {this.getData2(item.children)}
                    </Menu.SubMenu>))
                } else {
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
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
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }>
                                {this.getData(item.children)}
                            </Menu.SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
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