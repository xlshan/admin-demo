import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import memoryUtils from '../src/utils/memoryUtils'
import storyUtils from '../src/utils/storyUtils'


const user = storyUtils.getUser();
if(user && user._id){
    memoryUtils.user = user
}




ReactDOM.render(<App/>,window.root)
