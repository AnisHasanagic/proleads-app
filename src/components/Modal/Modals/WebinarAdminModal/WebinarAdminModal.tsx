import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
    updateWebinar,
    addWebinar,
} from "../../../../store/webinars/webinars.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import MyDropzone from "../../../Dropzone/Dropzone";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./WebinarAdminModal.scss";

function WebinarAdminModal({ webinar, isAdd }: any) {
    const dispatch = useDispatch();

    const webinars = useSelector((state: any) => state.webinars);

    const INITIAL_WEBINAR = {
        title: "",
        description: "",
        link: "",
        starts_at: moment().utc(true).format('YYYY-MM-DDTHH:mm'),
        video: null,
        is_archived: true,
        is_active: true,
    };

    const [newWebinar, setNewWebinar] = useState<any>(INITIAL_WEBINAR);
    const [newWebinarErrors, setNewWebinarErrors] = useState<any>({});
    const [displayVideo, setDisplayVideo] = useState<any>(null);

    const validations: any = {
        title: {
            isRequired: true,
        },
        description: {
            isRequired: true,
        },
        link: {
            isRequired: true,
        },
        start_at: {
            isRequired: true,
        },
        is_archived: {
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

        setNewWebinar({
            ...newWebinar,
            [name]: value,
        });
        if (errors.length > 0)
            setNewWebinarErrors({
                ...newWebinarErrors,
                [name]: errors,
            });
        else
            setNewWebinarErrors({
                ...newWebinarErrors,
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

        setNewWebinar({
            ...newWebinar,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewWebinarErrors({
                ...newWebinarErrors,
                [name]: errors,
            });
        else
            setNewWebinarErrors({
                ...newWebinarErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newWebinarErrors).some(
            (value: any) => newWebinarErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (webinar) {
            setNewWebinar({
                title: webinar.title,
                description: webinar.description,
                link: webinar.link,
                starts_at: moment(webinar.starts_at).utc(true).format('YYYY-MM-DDTHH:mm'),
                video: isAdd
                    ? null
                    : `${process.env.REACT_APP_API_VIDEOS}/${webinar.video_url}`,
                is_archived: !!webinar.is_archived,
                is_active: !!webinar.is_active,
            });
            setNewWebinarErrors({});
            setDisplayVideo(
                isAdd
                    ? null
                    : (webinar.video_url ? `${process.env.REACT_APP_API_VIDEOS}/${webinar.video_url}` : null)
            );
        }
    }, [webinar]);

    const setVideo = (video: any) => {
        setNewWebinar({
            ...newWebinar,
            video,
        });
    };

    useEffect(() => {
        if (webinars.update.errors) {
            setNewWebinarErrors(webinars.update.errors);
        }
    }, [webinars.update]);

    useEffect(() => {
        if (webinars.add.errors) {
            setNewWebinarErrors(webinars.add.errors);
        }
    }, [webinars.add]);

    return (
        <div id="webinar-admin-modal">
            <Form>
                <Input
                    id={"webinarTitle"}
                    type={"text"}
                    name={"title"}
                    value={newWebinar["title"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newWebinarErrors["title"]}
                    placeholder={"Title"}
                />
                <Input
                    id={"webinarDesc"}
                    type={"text"}
                    name={"description"}
                    value={newWebinar["description"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newWebinarErrors["description"]}
                    placeholder={"Description"}
                    isTextarea
                />
                <Input
                    id={"webinarLink"}
                    type={"text"}
                    name={"link"}
                    value={newWebinar["link"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newWebinarErrors["link"]}
                    placeholder={"Zoom Link"}
                />
                <Input
                    id={"webinarStartsAt"}
                    type={"datetime-local"}
                    name={"starts_at"}
                    value={newWebinar["starts_at"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newWebinarErrors["starts_at"]}
                    placeholder={"Starts At"}
                />
                <MyDropzone
                    setDisplayImage={setDisplayVideo}
                    setImage={setVideo}
                    errors={newWebinarErrors["video"]}
                    setErrors={(errors: any) => {
                        setNewWebinarErrors({
                            ...newWebinarErrors,
                            video: errors,
                        });
                    }}
                />
                {displayVideo && (
                    <div className="webinar-banner">
                        <Suspense fallback={<div>Loading...</div>}>
                            <ReactPlayer
                                controls
                                width={"100%"}
                                height={"100%"}
                                url={[
                                    {
                                        src: displayVideo,
                                        type: "video/mp4",
                                    },
                                ]}
                                fallback={<>...</>}
                            />
                        </Suspense>
                    </div>
                )}
                <Checkbox
                    checkItem={(): void =>
                        setNewWebinar({
                            ...newWebinar,
                            is_active: !newWebinar.is_active,
                        })
                    }
                    isChecked={newWebinar.is_active}
                    disabled={false}
                    label="Is active?"
                />
                <Checkbox
                    checkItem={(): void =>
                        setNewWebinar({
                            ...newWebinar,
                            is_archived: !newWebinar.is_archived,
                        })
                    }
                    isChecked={newWebinar.is_archived}
                    disabled={false}
                    label="Is archived?"
                />
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateWebinar(newWebinar, webinar.id))
                        }
                        loading={webinars.update.loading}
                        disabled={webinars.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addWebinar(newWebinar))}
                        loading={webinars.add.loading}
                        disabled={webinars.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default WebinarAdminModal;
