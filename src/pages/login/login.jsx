import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom'

import './login.less'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storyUtils from '../../utils/storyUtils'
import logo from '../../assets/images/logo.png'


class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { username, password } = values
                let res = await reqLogin(username, password)
                if (res.status == 0) {
                    message.success('登录成功')
                    const user = res.data;
                    storyUtils.saveUser(user)
                    memoryUtils.user = user;
                    this.props.history.replace('/') //事件回调中跳转
                } else {
                    message.error(res.msg)
                }

            } else {
                console.log('校验失败')
            }
        });
    }

    validatorPwd = (rule, value, callback) => {
        const form = this.props.form
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('必须大于等于 4 位')
        } else if (value.length > 12) {
            callback('必须小于等于 12 位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('必须是英文、数字或下划线组成')
        } else {
            callback()
        }
    }

    render() {
        if (memoryUtils.user && memoryUtils.user._id) {
            return <Redirect to='/' />
        }
        const { getFieldDecorator } = this.props.form

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1> 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <div className="login-box">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '用户名必须输入' },
                                        { min: 4, message: '必须大于等于 4 位' },
                                        { max: 12, message: '必须小于等于 12 位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/g, message: '必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue: 'admin'
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatorPwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登 录
                        </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

const loginWrap = Form.create()(Login)
export default loginWrap