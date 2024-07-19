'use client'
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { TailSpin } from "react-loader-spinner";

const Editor = dynamic(
    async () => await import('react-draft-wysiwyg').then((mod) => mod.Editor),
    {
        loading: () => <TailSpin />,
        ssr: false
    });

const Wysi = ({ id, setWysiData, getWysiData }) => {
    if (typeof window === undefined) return <></>;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };
    const contentHTML = "";
    const getContentAsHTML = () => {
        const contentState = editorState.getCurrentContent();
        contentHTML = draftToHtml(convertToRaw(contentState));
        return contentHTML;
    };

    useEffect(() => {
        if (setWysiData != '<p></p>\n') setContent(setWysiData);
    }, []);

    useEffect(() => {
        getWysiData(getContentAsHTML());
    }, [id, editorState]);

    const setContent = (newContent) => {
        const contentBlocks = convertFromHTML(newContent);
        if (contentBlocks) {
            const contentState = ContentState.createFromBlockArray(contentBlocks.contentBlocks, contentBlocks.entityMap);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    };
    return (
        <>
            <div className="container my-5">
                {
                    typeof window !== undefined && (<Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        editorStyle={{
                            border: "solid 1px lightgray",
                            padding: "5px",
                        }}
                    />)
                }
            </div>
        </>
    );
}
export default Wysi