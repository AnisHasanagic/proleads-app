import React from "react";
import { useNavigate } from "react-router-dom";

import "./LessonItem.scss";
import { Button, ButtonTypes } from "../Button/Button";

function LessonItem({ lesson, isCoursePage, isActive }: any) {
    const navigate = useNavigate();

    return (
        <div className={`lesson ${isActive ? "active" : ""}`}>
            <h3>{lesson.title}</h3>
            <p className="mt-2">{lesson.description}</p>
            <Button
                onClick={() =>
                    navigate(
                        `/dashboard/crypto-academy/course/${lesson.course.slug}/${lesson.id}`
                    )
                }
                btnClass={ButtonTypes.secondary}
                small
                customClass="ml-auto mt-2"
            >
                {isCoursePage ? "Play" : "Start"}
            </Button>
        </div>
    );
}

export default LessonItem;
