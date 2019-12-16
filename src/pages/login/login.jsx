import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const form = this.props.form
        const values = form.getFieldsValue()
        console.log(values)
    }

    render() {
        
        const { getFieldDecorator } = this.props.form

        return (
            <div className="login-box">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
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
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const loginWrap = Form.create()(Login)
export default loginWrap