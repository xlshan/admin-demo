import React, { Component } from 'react'
import { Card, Button, Select, Input, Row, Col, Table } from 'antd'
import LikeButton from '../../components/like-button'
import { reqProducts } from '../../api/index'
import { id } from 'postcss-selector-parser'
const { Option } = Select

export default class Product extends Component {

    state = {
        pageNum: 1,
        pageSize: 3,
        lists: []
    }


    componentWillMount() {
        this.getExtra()
        this.getTitle()
        this.getColumns()
    }

    componentDidMount() {
        this.getLists()
    }

    getLists = async () => {
        let { pageNum, pageSize, lists } = this.state
        let res = await reqProducts(pageNum, pageSize)
        if (res.status == 0) {
            this.setState({
                lists: res.data.list
            })
        }
    }


    getColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'jiage',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '操作',
                render: () => (
                    <>
                        <LikeButton>详情</LikeButton>
                        <LikeButton>修改</LikeButton>
                    </>
                )
            },
        ]
    }

    getExtra = () => {
        this.extra = <Button type="primary" icon="plus">添加</Button>
    }


    getTitle = () => {
        const options = [{
            value: '0',
            label: '按名称搜索'
        },
        {
            value: '1',
            label: '按描述搜索'
        }]

        this.title = (
            <>
                <Row>
                    <Col span={3} style={{ marginRight: 20 }}>
                        <Select defaultValue="0" style={{ width: 120 }}>
                            {
                                options.map((item, i) => (
                                    <Option value={item.value} key={i}>{item.label}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={3} style={{ marginRight: 20 }}><Input placeholder="关键字" style={{ width: 120 }} /></Col>
                    <Col span={6}><Button type="primary">搜索</Button></Col>
                </Row>
            </>
        )
    }
    render() {
        const { lists } = this.state

        return (
            <Card title={this.title} extra={this.extra}>
                <Table dataSource={lists} columns={this.columns} bordered rowKey='_id' />
            </Card>
        )
    }
}