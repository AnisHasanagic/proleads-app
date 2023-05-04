import React, { useEffect, useRef } from "react";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import "./RichEditor.sass";
import QuillPaste from "./QuillPaste";
import DOMPurify from 'dompurify';

const Quill = require("quill");

const BlockEmbed = Quill.import("blots/block/embed");
const bold = Quill.import("formats/bold");
const italic = Quill.import("formats/italic");

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

Quill.register(DividerBlot);

bold.tagName = "b";
Quill.register(bold, true);

italic.tagName = "i";
Quill.register(italic, true);

Quill.register("modules/clipboard", QuillPaste, true);

const RichEditor = ({
    editorId,
    value,
    handleChange,
    onBlur = null,
    onFocus = null,
    enableHR = false,
}) => {
    const isMounted = useRef(false);
    const quillRef: Quill = useRef();

    useEffect(() => {
        if (isMounted.current) return;

        const quill = new Quill(`#${editorId}`, {
            format: ["bold", "italic", "link", "list", "header"],
            modules: {
                toolbar: `#${editorId}Toolbar`,
                history: {
                    delay: 100,
                    maxStack: 100,
                },
                clipboard: {
                    allowed: {
                        tags: [
                            "b",
                            "strong",
                            "i",
                            "em",
                            "p",
                            "br",
                            "hr",
                            "ol",
                            "ul",
                            "li",
                            "a",
                        ],
                    },
                    keepSelection: false,
                    substituteBlockElements: true,
                    magicPasteLinks: true,
                },
            },
            theme: "snow",
        });

        quill.root.innerHTML = value;

        quill.root.addEventListener('blur', function () {
            onChange(quill.root.innerHTML);
            onBlur && onBlur();
        });

        quill.root.addEventListener('focus', function () {
            onChange(quill.root.innerHTML);
            onBlur && onBlur();
        });

        quillRef.current = quill;
        isMounted.current = true;
    }, []);

    useEffect(() => {
        if (!quillRef.current) return;

        quillRef.current.root.innerHTML = value;
    }, [value]);

    const addHR = () => {
        if (!quillRef.current) {
            return;
        }

        const range = quillRef.current.getSelection(true);

        if (range) {
            quillRef.current.insertEmbed(
                range.index,
                "divider",
                true,
                Quill.sources.USER
            );
            quillRef.current.setSelection(
                range.index + 2,
                Quill.sources.SILENT
            );
        }
    };

    const onChange = (html) => {
        handleChange && handleChange(DOMPurify.sanitize(html));
    };

    return (
        <div className="editor">
            <div id={`${editorId}Toolbar`}>
                <div className="main-controls">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-link" />
                    <span className="ql-formats">
                        <button className="ql-list" value="ordered" />
                        <button className="ql-list" value="bullet" />
                        <button className="ql-indent" value="-1" />
                        <button className="ql-indent" value="+1" />
                    </span>
                    <span className="ql-formats">
                        <select className="ql-header" defaultValue="3">
                            <option value="1">Heading</option>
                            <option value="2">Subheading</option>
                            <option value="3">Normal</option>
                        </select>
                    </span>
                    {enableHR && (
                        <button className="ql-hr" onClick={() => addHR()}>
                            -
                        </button>
                    )}
                </div>
            </div>
            <div id={editorId} />
        </div>
    );
};

export default RichEditor;
