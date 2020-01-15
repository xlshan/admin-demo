import React, { Component } from 'react'

import { Card, Icon } from 'antd'
import LikeButton from '../../components/like-button'
export default class AddProduct extends Component {
    backs = () => {
        this.props.history.goBack()
    }
    render() {
        const title = (
            <>
                <LikeButton onClick={this.backs}><Icon type="arrow-left" /></LikeButton>
                <span>添加商品</span>
            </>
        )
        return (
            <Card title={title}>
                dff
            </Card>
        )
    }
}