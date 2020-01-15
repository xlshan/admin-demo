import React, { Component } from 'react'

import { Card, Icon, Form, Input, Cascader } from 'antd'
import LikeButton from '../../components/like-button'



const { TextArea } = Input;
class AddProduct extends Component {
    backs = () => {
        this.props.history.goBack()
    }
    onChange = () => {

    }
    render() {
        const title = (
            <>
                <LikeButton onClick={this.backs}><Icon type="arrow-left" /></LikeButton>
                <span>添加商品</span>
            </>
        )
        const { getFieldDecorator } = this.props.form
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                            },
                        ],
                    },
                ],
            },
        ]

        return (
            <Card title={title} >
                <Form labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
                    <Form.Item label="商品名称">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品名称!',
                                },
                            ],
                        })(<Input placeholder="请输入商品名称" />)}
                    </Form.Item>

                    <Form.Item label="商品描述">
                        {getFieldDecorator('desc', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品描述!',
                                },
                            ],
                        })(<TextArea type="textarea" placeholder="请输入商品描述" />)}
                    </Form.Item>

                    <Form.Item label="商品价格">
                        {getFieldDecorator('price', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品价格!',
                                },
                            ],
                        })(<Input placeholder="请输入商品价格" addonAfter={<span>元</span>} />)}
                    </Form.Item>

                    <Form.Item label="商品分类">
                        <Cascader options={options} onChange={this.onChange} placeholder="请选择分类" />
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(AddProduct)