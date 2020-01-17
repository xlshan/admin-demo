import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Editors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    getDetail = () => {

        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        
        }

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                initialEditorState={editorState}
                editorStyle={{height: 250, border: '1px solid #000', padding: '0 30px'}}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}