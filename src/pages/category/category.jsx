import React, { Component } from 'react'
import { Card, Table, Button, Modal, Form, message } from 'antd'
import './category.less'
import AddCategory from '../../components/category/addCategory'
import { reqAddCategory, reqCategorys } from '../../api/index'

class Category extends Component {
    state = {
        isShowAdd: 0,
        list1: [],
        parentId: '0'
    }

    componentDidMount() {
        this.getCategorys()
    }

    getCategorys = async () => {
        let { parentId } = this.state
        let res = await reqCategorys(parentId)
        if (res.status == 0) {
            this.setState({
                list1: res.data
            })
        } else {
            message.error(res.msg)
        }
    }

    getColumns = () => {
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '操作',
                dataIndex: 'caozuo',
                key: 'caozuo',
                width: 280,
                render() {
                    return (<div>
                        <Button type="link">修改分类</Button>
                        <Button type="link">查看子分类</Button>
                    </div>)
                }
            }
        ];
        return columns
    }


    handleOk = () => {
        this.addCategory()
        this.setState({
            isShowAdd: 0,
        });
    }

    addCategory = async () => {
        let { parentId, categoryName } = this.form.getFieldsValue()
        let res = await reqAddCategory(categoryName, parentId)
        if (res.status == 0) {
            message.success('添加成功')
            this.form.resetFields()
            this.getCategorys()
        } else {
            message.error(res.msg)
        }
    }

    handleCancel = () => {
        this.setState({
            isShowAdd: 0,
        });
    }

    extra = () => {
        return (
            <Button type="primary" icon="plus" onClick={this.addFn}>添加</Button>
        )
    }

    addFn = () => {
        this.setState({
            isShowAdd: 1
        })
    }

    render() {
        const { parentId, list1 } = this.state

        return (
            <div className="category">
                <Card title="一级分类列表" extra={this.extra()}>
                    <Table dataSource={list1} columns={this.getColumns()} rowKey={item => item._id} bordered={true} />

                    <Modal
                        title="添加分类"
                        visible={this.state.isShowAdd == 1}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消">
                        <AddCategory setForm={form => this.form = form} parentId={parentId}></AddCategory>
                    </Modal>

                </Card>
            </div >
        )
    }
}

export default Form.create()(Category)
