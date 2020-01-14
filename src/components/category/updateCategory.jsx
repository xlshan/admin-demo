import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'



class UpdateCategory extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.string.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { categoryName } = this.props
        return (
            <Form className="login-form">

                <Form.Item label="修改分类">
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName
                        })(<Input placeholder="请输入分类名称"
                    />)
                }

                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateCategory)