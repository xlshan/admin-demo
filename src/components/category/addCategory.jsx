import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'


const { Option } = Select

class AddCategory extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        parentId: PropTypes.string.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { parentId } = this.props
        return (
            <Form className="login-form">
                <Form.Item label="所属分类">
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option key="0" value="0">一级分类</Option>
                            </Select>)
                    }
                </Form.Item>

                <Form.Item label="添加分类">
                    {
                        getFieldDecorator('categoryName', {
                            rules: [{ required: true, message: '请输入分类名称' }]
                        })(<Input placeholder="请输入分类名称"
                        />)
                    }

                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(AddCategory)