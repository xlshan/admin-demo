import React, { Component } from 'react'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import storyUtils from '../../utils/storyUtils'
import { formateDate } from '../../utils/dateUtils'
import LikeButton from '../like-button/index'
import { Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import menuConfig from '../../config/menuConfig'


class Header extends Component {
    state = {
        time: formateDate(Date.now())
    }
    componentDidMount() {
        this.getTime()
        this.getTitle()
    }


    getTitle = (current_path) => {
        if (menuConfig.length) {
            let title
            menuConfig.forEach(item => {
                if (item.children) {
                    item.children.forEach(item2 => {
                        if (current_path == item2.key) {
                            title = item2.title
                        }
                    })
                } else {
                    if (current_path == item.key) {
                        title = item.title
                    }
                }
            })
            return title
        }
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

        let current_path = this.props.location.pathname
        let current_title = this.getTitle(current_path)

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <LikeButton onClick={this.logout}>退出</LikeButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{current_title}</div>
                    <div className="header-bottom-right">
                        <span>{time}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)