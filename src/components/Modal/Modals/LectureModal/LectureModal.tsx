import React, { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
    updateLecture,
    addLecture,
} from "../../../../store/course/course.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import MyDropzone from "../../../Dropzone/Dropzone";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import { Select } from "../../../Select/Select";

import "./LectureModal.scss";

function LectureModal({ lecture, isAdd }: any) {
    const dispatch = useDispatch();

    const courses = useSelector((state: any) => state.courses);

    const INITIAL_LECTURE = {
        title: "",
        description: "",
        order: "",
        course_id: "",
        video: null,
        is_active: true,
    };

    const [newLecture, setNewLecture] = useState<any>(INITIAL_LECTURE);
    const [newLectureErrors, setNewLectureErrors] = useState<any>({});
    const [displayVideo, setDisplayVideo] = useState<any>(null);

    const validations: any = {
        title: {
            isRequired: true,
        },
        description: {
            isRequired: true,
        },
        order: {
            isRequired: true,
        },
        course_id: {
            isRequired: true,
        },
        video: {
            isRequired: true,
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

        setNewLecture({
            ...newLecture,
            [name]: value,
        });
        if (errors.length > 0)
            setNewLectureErrors({
                ...newLectureErrors,
                [name]: errors,
            });
        else
            setNewLectureErrors({
                ...newLectureErrors,
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

        setNewLecture({
            ...newLecture,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewLectureErrors({
                ...newLectureErrors,
                [name]: errors,
            });
        else
            setNewLectureErrors({
                ...newLectureErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newLectureErrors).some(
            (value: any) => newLectureErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (lecture) {
            setNewLecture({
                title: lecture.title,
                description: lecture.description,
                order: lecture.order,
                video: isAdd
                    ? null
                    : `${process.env.REACT_APP_API_VIDEOS}/${lecture.video_url}`,
                course_id: lecture.course_id,
                is_active: !!lecture.is_active,
            });
            setNewLectureErrors({});
            setDisplayVideo(
                isAdd
                    ? null
                    : `${process.env.REACT_APP_API_VIDEOS}/${lecture.video_url}`
            );
        }
    }, [lecture]);

    const setVideo = (video: any) => {
        setNewLecture({
            ...newLecture,
            video,
        });
    };

    useEffect(() => {
        if (courses.update_lecture.errors) {
            setNewLectureErrors(courses.update_lecture.errors);
        }
    }, [courses.update_lecture]);

    useEffect(() => {
        if (courses.add_lecture.errors) {
            setNewLectureErrors(courses.add_lecture.errors);
        }
    }, [courses.add_lecture]);

    const coursesList = [
        {
            value: "",
            label: "Select Course"
        },
        ...courses.list.map((course: any) => {
            return {
                label: course.title,
                value: course.id,
            };
        })
    ];

    return (
        <div id="lecture-modal">
            <Form>
                <Input
                    id={"lectureTitle"}
                    type={"text"}
                    name={"title"}
                    value={newLecture["title"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newLectureErrors["title"]}
                    placeholder={"Title"}
                />
                <Input
                    id={"lectureDesc"}
                    type={"text"}
                    name={"description"}
                    value={newLecture["description"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newLectureErrors["description"]}
                    placeholder={"Description"}
                    isTextarea
                />
                <Select
                    id={"lectureCourseId"}
                    name="course_id"
                    value={newLecture["course_id"]}
                    onChange={(e: any) => changeEvent(e)}
                    large
                    disabled={false}
                    options={coursesList}
                    required
                    errors={newLectureErrors["course_id"]}
                />
                <Input
                    id={"lectureOrder"}
                    type={"text"}
                    name={"order"}
                    value={newLecture["order"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newLectureErrors["order"]}
                    placeholder={"Order"}
                />
                <MyDropzone
                    setDisplayImage={setDisplayVideo}
                    setImage={setVideo}
                    errors={newLectureErrors["video"]}
                    setErrors={(errors: any) => {
                        setNewLectureErrors({
                            ...newLectureErrors,
                            video: errors,
                        });
                    }}
                />
                {displayVideo && (
                    <div className="lecture-banner">
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
                        setNewLecture({
                            ...newLecture,
                            is_active: !newLecture.is_active,
                        })
                    }
                    isChecked={newLecture.is_active}
                    disabled={false}
                    label="Is active?"
                />
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateLecture(newLecture, lecture.id))
                        }
                        loading={courses.update_lecture.loading}
                        disabled={
                            courses.update_lecture.loading || hasSomeErrors()
                        }
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addLecture(newLecture))}
                        loading={courses.add_lecture.loading}
                        disabled={
                            courses.add_lecture.loading || hasSomeErrors()
                        }
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default LectureModal;
