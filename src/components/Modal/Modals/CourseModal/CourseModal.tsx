import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addCourse,
    updateCourse,
} from "../../../../store/course/course.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import MyDropzone from "../../../Dropzone/Dropzone";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import { Select } from "../../../Select/Select";

import "./CourseModal.scss";

function CourseModal({ course, isAdd }: any) {
    const dispatch = useDispatch();

    const courses = useSelector((state: any) => state.courses);

    const INITIAL_COURSE = {
        title: "",
        type: "",
        description: "",
        slug: "",
        image: null,
        is_active: true,
    };

    const [newCourse, setNewCourse] = useState<any>(INITIAL_COURSE);
    const [newCourseErrors, setNewCourseErrors] = useState<any>({});
    const [displayImage, setDisplayImage] = useState<any>(null);

    const validations: any = {
        title: {
            isRequired: true,
        },
        type: {
            isRequired: true,
        },
        description: {
            isRequired: true,
        },
        slug: {
            isRequired: true,
        },
        image: {
            isRequired: true,
        },
        is_active: {
            isRequred: true,
            isBoolean: true,
        },
    };

    const changeEvent = (e: any): void => {
        const name = e.target.name;
        let value = e.target.value;

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

        if (name === 'slug' && value) {
            value = value.toLowerCase().replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
        }

        setNewCourse({
            ...newCourse,
            [name]: value,
        });
        if (errors.length > 0)
            setNewCourseErrors({
                ...newCourseErrors,
                [name]: errors,
            });
        else
            setNewCourseErrors({
                ...newCourseErrors,
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

        setNewCourse({
            ...newCourse,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewCourseErrors({
                ...newCourseErrors,
                [name]: errors,
            });
        else
            setNewCourseErrors({
                ...newCourseErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newCourseErrors).some(
            (value: any) => newCourseErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (course) {
            setNewCourse({
                title: course.title,
                description: course.description,
                type: course.type,
                slug: course.slug,
                image: isAdd
                    ? null
                    : `${process.env.REACT_APP_API_IMAGES}/${course.image}`,
                is_active: !!course.is_active,
            });
            setNewCourseErrors({});
            setDisplayImage(
                isAdd
                    ? null
                    : `${process.env.REACT_APP_API_IMAGES}/${course.image}`
            );
        }
    }, [course]);

    const setImage = (image: any) => {
        setNewCourse({
            ...newCourse,
            image,
        });
    };

    useEffect(() => {
        if (courses.update.errors) {
            setNewCourseErrors(courses.update.errors);
        }
    }, [courses.update]);

    useEffect(() => {
        if (courses.add.errors) {
            setNewCourseErrors(courses.add.errors);
        }
    }, [courses.add]);

    const typesList = [
        {
            value: "",
            label: "Select Type",
        },
        {
            value: "beginner",
            label: "Beginner",
        },
        {
            value: "medium",
            label: "Medium",
        },
        {
            value: "advance",
            label: "Advance",
        },
    ];

    return (
        <div id="course-modal">
            <Form>
                <Input
                    id={"courseTitle"}
                    type={"text"}
                    name={"title"}
                    value={newCourse["title"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCourseErrors["title"]}
                    placeholder={"Title"}
                />
                <Select
                    id={"courseType"}
                    name="type"
                    value={newCourse["type"]}
                    onChange={(e: any) => changeEvent(e)}
                    large
                    disabled={false}
                    options={typesList}
                    required
                    errors={newCourseErrors["type"]}
                />
                <Input
                    id={"courseDesc"}
                    type={"text"}
                    name={"description"}
                    value={newCourse["description"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCourseErrors["description"]}
                    placeholder={"Description"}
                    isTextarea
                />
                <Input
                    id={"courseSlug"}
                    type={"text"}
                    name={"slug"}
                    value={newCourse["slug"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCourseErrors["slug"]}
                    placeholder={"Slug"}
                />
                <MyDropzone
                    setDisplayImage={setDisplayImage}
                    setImage={setImage}
                    errors={newCourseErrors["image"]}
                    setErrors={(errors: any) => {
                        setNewCourseErrors({
                            ...newCourseErrors,
                            image: errors,
                        });
                    }}
                />
                {displayImage && (
                    <img
                        className="course-banner"
                        src={displayImage}
                        alt="Course Banner"
                    />
                )}
                <Checkbox
                    checkItem={(): void =>
                        setNewCourse({
                            ...newCourse,
                            is_active: !newCourse.is_active,
                        })
                    }
                    isChecked={newCourse.is_active}
                    disabled={false}
                    label="Is active?"
                />
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateCourse(newCourse, course.id))
                        }
                        loading={courses.update.loading}
                        disabled={courses.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addCourse(newCourse))}
                        loading={courses.add.loading}
                        disabled={courses.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default CourseModal;
