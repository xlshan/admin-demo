import React, { Component } from 'react'
import { Card, Button, Select, Input, Row, Col, Table, message } from 'antd'
import LikeButton from '../../components/like-button'
import { reqProducts, reqSearchProducts } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'



const { Option } = Select

export default class Product extends Component {

    state = {
        lists: [],
        total: 0,
        search_name: '',
        search_type: 'productName'
    }


    componentWillMount() {
        this.getColumns()
    }

    componentDidMount() {
        this.getLists(1)
    }

    search = () => {
        this.getLists(1, 'search')
    }

    getLists = async (page, type) => {
        const { search_name, search_type } = this.state
        this.pageNum = page
        let res
        if (type == 'search') {
            res = await reqSearchProducts({ pageNum: page, pageSize: PAGE_SIZE, searchType: search_type, searchName: search_name })
        } else {
            res = await reqProducts(page, PAGE_SIZE)
        }

        if (res.status == 0) {
            this.setState({
                lists: res.data.list,
                total: res.data.total
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


    inputChange = (e) => {
        this.setState({
            search_name: e.target.value
        })
    }

    selectChange = (v) => {
        this.setState({
            search_type: v,
            search_name: ''
        })
    }

    addFn = () => {
        this.props.history.push('/product/add')
    }


    render() {
        const { lists, total, search_name, search_type } = this.state

        const options = [{
            value: 'productName',
            label: '按名称搜索'
        },
        {
            value: 'productDesc',
            label: '按描述搜索'
        }]

        const title = (
            <>
                <Row>
                    <Col span={3} style={{ marginRight: 20 }}>
                        <Select defaultValue="0" style={{ width: 120 }} value={search_type} onChange={this.selectChange}>
                            {
                                options.map((item, i) => (
                                    <Option value={item.value} key={i}>{item.label}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={3} style={{ marginRight: 20 }}>
                        <Input placeholder="关键字" style={{ width: 120 }} value={search_name} onChange={this.inputChange} allowClear />
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={this.search}>搜索</Button>
                    </Col>
                </Row>
            </>
        )

        const extra = <Button type="primary" icon="plus" onClick={this.addFn}>添加</Button>

        return (
            <Card title={title} extra={extra}>
                <Table dataSource={lists} columns={this.columns} bordered rowKey='_id' pagination={{
                    current: this.pageNum,
                    total,
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    onChange: this.getLists
                }} />
            </Card>
        )
    }
}