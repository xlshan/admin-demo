import React,{Component} from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'


export default class Admin extends Component {
    render(){
        let user = memoryUtils.user
        
        if(!user || !user._id){
            // 自动跳转render中
            return <Redirect to="/login"/>   //render中跳转
        }
        return (
            
            <div>hello {user.username}</div>
        )
    }
}