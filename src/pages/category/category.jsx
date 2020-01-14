import React, { Component } from 'react'
import { Card, Table, Button, Modal, Form, message } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import './category.less'
import AddCategory from '../../components/category/addCategory'
import UpdateCategory from '../../components/category/updateCategory'
import { reqAddCategory, reqCategorys, reqUpdateCategory } from '../../api/index'
import LikeButton from '../../components/like-button/index'

class Category extends Component {
    state = {
        isShow: 0,
        list1: [],
        list2: [],
        parentId: '0',
        loading: false,
        title: ''
    }


    // componentWillMount(){
    //     this.getColumns()
    // }

    componentDidMount() {
        let { parentId } = this.state
        this.getCategorys(parentId)
    }

    getCategorys = async (parentId) => {
        this.setState({
            loading: true
        })
        let res = await reqCategorys(parentId)
        this.setState({
            loading: false
        })
        if (res.status == 0) {
            if (parentId === '0') {
                this.setState({
                    list1: res.data
                })
            } else {
                this.setState({
                    list2: res.data
                })
            }

        } else {
            message.error(res.msg)
        }
    }

    getList2 = (category) => {
        this.setState({
            parentId: category._id,
            title: category.name
        }, () => {
            this.getCategorys(category._id)
        })
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
                // dataIndex: 'caozuo',
                // key: 'caozuo',
                width: 280,
                render: (category) => {
                    return (<div>
                        <LikeButton onClick={() => this.updateFn(category)}>修改分类</LikeButton>
                        <LikeButton onClick={() => this.getList2(category)}>查看子分类</LikeButton>
                    </div>)
                }
            }
        ];
        return columns
    }



    getColumn = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <>
                        <LikeButton onClick={() => this.updates(category)}>修改分类</LikeButton>
                        {
                            this.state.parentId == '0' ? <LikeButton onClick={() => this.getSubCategoryList(category)}>查看子分类</LikeButton> : null
                        }
                    </>
                ),
            }
        ];
    }


    handleOkAdd = () => {
        this.addCategory()
        this.setState({
            isShow: 0,
        });
    }

    handleCancelAdd = () => {
        this.setState({
            isShow: 0,
        });
    }


    handleOkUpdate = () => {
        this.updateCategory()
        this.setState({
            isShow: 0,
        });
    }

    handleCancelUpdate = () => {
        this.setState({
            isShow: 0,
        });
    }

    addCategory = async () => {
        this.setState({
            loading: true
        })
        let { parentId, categoryName } = this.form.getFieldsValue()
        let res = await reqAddCategory(categoryName, parentId)
        this.setState({
            loading: false
        })
        if (res.status == 0) {
            message.success('添加成功')
            this.form.resetFields()
            this.getCategorys(this.state.parentId)
        } else {
            message.error(res.msg)
        }
    }

    updateCategory = async () => {
        let { categoryName } = this.form.getFieldsValue()
        let { _id } = this.category
        let res = await reqUpdateCategory(_id, categoryName)
        if (res.status == 0) {
            message.success('修改成功')
            this.form.resetFields()
            this.getCategorys(this.state.parentId)
        } else {
            message.error(res.msg)
        }
    }



    extra = () => {
        return (
            <Button type="primary" icon="plus" onClick={this.addFn}>添加</Button>
        )
    }

    addFn = () => {
        this.setState({
            isShow: 1
        })
    }

    updateFn = (category) => {
        this.category = category
        this.setState({
            isShow: 2
        })
    }
    showCategorys = () => {
        this.setState({
            parentId: '0',
            title: '',
            list2: []
        })
    }

    render() {
        const { parentId, list1, list2, loading, title } = this.state
        const category = this.category || {}
        const titles = parentId == '0' ? '一级分类列表' : (
            <>
                <LikeButton onClick={this.showCategorys}>一级分类列表</LikeButton>  ->  
                {title}
            </>
        )
        return (
            <div className="category">
                <Card title={titles} extra={this.extra()}>
                    <Table dataSource={parentId == '0' ? list1 : list2} loading={loading} columns={this.getColumns()} rowKey={'_id'} bordered={true} />

                    <Modal
                        title="添加分类"
                        visible={this.state.isShow == 1}
                        onOk={this.handleOkAdd}
                        onCancel={this.handleCancelAdd}
                        okText="确认"
                        cancelText="取消">
                        <AddCategory setForm={form => this.form = form} parentId={parentId} categorys={list1}></AddCategory>
                    </Modal>


                    <Modal
                        title="更新分类"
                        visible={this.state.isShow == 2}
                        onOk={this.handleOkUpdate}
                        onCancel={this.handleCancelUpdate}
                        okText="确认"
                        cancelText="取消">
                        <UpdateCategory setForm={form => this.form = form} categoryName={category.name}></UpdateCategory>
                    </Modal>

                </Card>
            </div >
        )
    }
}

export default Form.create()(Category)
