import {
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import LessonItem from "../LessonItem/LessonItem";
import LessonItemLoader from "../LessonItem/LessonItemLoader";
import "./LessonsList.scss";

export const LessonsList = ({
    lessons,
    activeCourse,
    setActiveCourse,
    isCoursePage,
    activeLecture,
}: any) => {
    return (
        <div
            className={`lessons-list ${activeCourse ? "active" : ""} ${
                isCoursePage ? "isCoursePage" : ""
            }`}
        >
            {activeCourse && !isCoursePage && (
                <div className="details flex">
                    <div className="title">
                        <h3>{activeCourse.title}</h3>
                        <p>{activeCourse.description.slice(0, 80) + "..."}</p>
                    </div>
                    <div className="close ml-auto" onClick={() => setActiveCourse(null)}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
            )}
            <div className="lessons">
                {lessons.loading &&
                    [1, 2, 3, 4, 5].map((index: number) => (
                        <LessonItemLoader
                            key={index}
                            isCoursePage={isCoursePage}
                        />
                    ))}
                {!lessons.loading &&
                    lessons.list.map((lesson: any) => (
                        <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            isCoursePage={isCoursePage}
                            isActive={activeLecture && lesson.id === activeLecture.id}
                        />
                    ))}
            </div>
        </div>
    );
};
