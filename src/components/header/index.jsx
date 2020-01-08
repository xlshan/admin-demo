import React, { Component } from 'react'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import storyUtils from '../../utils/storyUtils'
import { formateDate } from '../../utils/dateUtils'
import LikeButton from '../like-button/index'
import { Modal } from 'antd'
import { withRouter } from 'react-router-dom'


class Header extends Component {
    state = {
        time: formateDate(Date.now())
    }
    componentDidMount() {
        this.getTime()
    }

    getTime = () => {
        // setInterval  如果用setInterval，那么在退出登录时需要销毁
        // this.timer = setInterval(() => {
        //     this.setState({ time: formateDate(Date.now()) })
        // }, 1000);
        setTimeout(() => {
            this.setState({ time: formateDate(Date.now()) })
        }, 1000);
    }

    logout = () => {
        Modal.confirm({
            content: '您确认退出吗？',
            onOk: () => { 
                storyUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            }
        });
    }



    render() {
        let { username } = memoryUtils.user
        let { time } = this.state
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <LikeButton onClick={this.logout}>退出</LikeButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>{time}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)