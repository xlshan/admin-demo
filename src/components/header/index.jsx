import React, { Component } from 'react'
import './index.less'

export default class Header extends Component {
    render() {
        return (
            // <div className="header">
            //     <div className="header-top">
            //         <span>欢迎, {username}</span>
            //         <LinkButton onClick={this.logout}>退出</LinkButton>
            //     </div>
            //     <div className="header-bottom">
            //         <div className="header-bottom-left">{title}</div>
            //         <div className="header-bottom-right">
            //             <span>{currentTime}</span>
            //             <img src={dayPictureUrl} alt="weather" />
            //             <span>{weather}</span>
            //         </div>
            //     </div>
            // </div>


            <div className="header">
                <div className="header-top">
                    <span>欢迎, dfads</span>
                    {/* <LinkButton onClick={this.logout}>退出</LinkButton> */}
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2020-10-10</span>
                        <img src='' alt="weather" />
                        <span>fdaf</span>
                    </div>
                </div>
            </div>
        )
    }
}