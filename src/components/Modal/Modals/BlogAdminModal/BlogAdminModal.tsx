import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updateBlog } from "../../../../store/news/news.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import MyDropzone from "../../../Dropzone/Dropzone";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

// Require Editor JS files.
import "froala-editor/js/plugins.pkgd.min.js"
// import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
// import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
// import "font-awesome/css/font-awesome.css";

import FroalaEditor from "react-froala-wysiwyg";

import "./BlogAdminModal.scss";

const documentConfig = {
    pluginsEnabled: ["fullscreen", "codeBeautifier", "colors", "align", "quote"],

    toolbarButtons: {
        // Key represents the more button from the toolbar.
        moreText: {
            // List of buttons used in the  group.
            buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "inlineClass",
                "inlineStyle",
                "clearFormatting",
            ],

            // Alignment of the group in the toolbar.
            align: "left",

            // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
            buttonsVisible: 3,
        },

        moreParagraph: {
            buttons: [
                "alignLeft",
                "alignCenter",
                "formatOLSimple",
                "alignRight",
                "alignJustify",
                "formatOL",
                "formatUL",
                "paragraphFormat",
                "paragraphStyle",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
            ],
            align: "left",
            buttonsVisible: 3,
        },

        moreRich: {
            buttons: [
                "insertLink",
                "insertImage",
                "insertVideo",
                "insertTable",
                "emoticons",
                "fontAwesome",
                "specialCharacters",
                "embedly",
                "insertFile",
                "insertHR",
            ],
            align: "left",
            buttonsVisible: 3,
        },

        moreMisc: {
            buttons: [
                "undo",
                "redo",
                "fullscreen",
                "print",
                "getPDF",
                "spellChecker",
                "selectAll",
                "html",
                "help",
            ],
            align: "right",
            buttonsVisible: 2,
        },
    },

    // Change buttons for XS screen.
    toolbarButtonsXS: [
        ["undo", "redo"],
        ["bold", "italic", "underline"],
    ],
};

function BlogAdminModal({ blog, isAdd }: any) {
    const dispatch = useDispatch();

    const blogs = useSelector((state: any) => state.news);

    const INITIAL_BLOG = {
        title: "",
        content: "",
        image: null,
        is_private: true,
        is_active: true,
    };

    const [newBlog, setNewBlog] = useState<any>(INITIAL_BLOG);
    const [newBlogErrors, setNewBlogErrors] = useState<any>({});
    const [displayImage, setDisplayImage] = useState<any>(null);

    const validations: any = {
        title: {
            isRequired: true,
        },
        content: {
            isRequired: true,
        },
        image: {
            isRequired: true,
        },
        is_private: {
            isRequred: true,
            isBoolean: true,
        },
        is_active: {
            isRequred: true,
            isBoolean: true,
        },
    };

    const changeEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewBlog({
            ...newBlog,
            [name]: value,
        });
        if (errors.length > 0)
            setNewBlogErrors({
                ...newBlogErrors,
                [name]: errors,
            });
        else
            setNewBlogErrors({
                ...newBlogErrors,
                [name]: [],
            });
    };

    const blurEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewBlog({
            ...newBlog,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewBlogErrors({
                ...newBlogErrors,
                [name]: errors,
            });
        else
            setNewBlogErrors({
                ...newBlogErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newBlogErrors).some(
            (value: any) => newBlogErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (blog) {
            setNewBlog({
                title: blog.title,
                content: blog.content,
                image: isAdd
                    ? null
                    : `${process.env.REACT_APP_API_IMAGES}/blogs/${blog.image}`,
                is_private: !!blog.is_private,
                is_active: !!blog.is_active,
            });
            setNewBlogErrors({});
            setDisplayImage(
                isAdd
                    ? null
                    : `${process.env.REACT_APP_API_IMAGES}/blogs/${blog.image}`
            );
        }
    }, [blog]);

    const setImage = (image: any) => {
        setNewBlog({
            ...newBlog,
            image,
        });
    };

    useEffect(() => {
        if (blogs.update.errors) {
            setNewBlogErrors(blogs.update.errors);
        }
    }, [blogs.update]);

    useEffect(() => {
        if (blogs.add.errors) {
            setNewBlogErrors(blogs.add.errors);
        }
    }, [blogs.add]);

    const handleModelChange = (content: any) => {
        const validator = validations["content"];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (content !== true || content !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (content.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewBlog({
            ...newBlog,
            content,
        });

        if (errors.length > 0)
            setNewBlogErrors({
                ...newBlogErrors,
                content: errors,
            });
        else
            setNewBlogErrors({
                ...newBlogErrors,
                content: [],
            });
    };

    return (
        <div id="blog-admin-modal">
            <Form>
                <Input
                    id={"blogTitle"}
                    type={"text"}
                    name={"title"}
                    value={newBlog["title"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newBlogErrors["title"]}
                    placeholder={"Title"}
                />
                <FroalaEditor
                    config={documentConfig}
                    tag="textarea"
                    model={newBlog.content}
                    onModelChange={(e: any) => handleModelChange(e)}
                />
                <MyDropzone
                    setDisplayImage={setDisplayImage}
                    setImage={setImage}
                    errors={newBlogErrors["image"]}
                    setErrors={(errors: any) => {
                        setNewBlogErrors({
                            ...newBlogErrors,
                            image: errors,
                        });
                    }}
                />
                {displayImage && (
                    <img
                        className="blog-banner"
                        src={displayImage}
                        alt="Blog Banner"
                    />
                )}
                <Checkbox
                    checkItem={(): void =>
                        setNewBlog({
                            ...newBlog,
                            is_private: !newBlog.is_private,
                        })
                    }
                    isChecked={newBlog.is_private}
                    disabled={false}
                    label="Is private?"
                />
                <Checkbox
                    checkItem={(): void =>
                        setNewBlog({
                            ...newBlog,
                            is_active: !newBlog.is_active,
                        })
                    }
                    isChecked={newBlog.is_active}
                    disabled={false}
                    label="Is active?"
                />
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(updateBlog(newBlog, blog.id))}
                        loading={blogs.update.loading}
                        disabled={blogs.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addBlog(newBlog))}
                        loading={blogs.add.loading}
                        disabled={blogs.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default BlogAdminModal;
