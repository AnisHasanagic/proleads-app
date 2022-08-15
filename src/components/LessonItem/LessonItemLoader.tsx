import React from "react";
import ContentLoader from "react-content-loader";

import "./LessonItem.scss";

function LessonItemLoader({ isCoursePage }: any) {
    if (isCoursePage) {
        return (
            <div className="lesson">
                <ContentLoader
                    viewBox="0 0 380 130"
                    foregroundColor="#28344c"
                    backgroundColor="#1d283e"
                >
                    {/* Only SVG shapes */}
                    <rect x="0" y="0" rx="4" ry="4" width="200" height="20" />
                    <rect x="0" y="50" rx="5" ry="5" width="250" height="13" />
                    <rect x="0" y="70" rx="5" ry="5" width="200" height="13" />
                    <rect
                        x="280"
                        y="90"
                        rx="10"
                        ry="10"
                        width="100"
                        height="40"
                    />
                </ContentLoader>
            </div>
        );
    }

    return (
        <div className="lesson">
            <ContentLoader
                viewBox="0 0 380 130"
                foregroundColor="#28344c"
                backgroundColor="#1d283e"
            >
                {/* Only SVG shapes */}
                <rect x="0" y="0" rx="4" ry="4" width="200" height="20" />
                <rect x="0" y="50" rx="5" ry="5" width="250" height="13" />
                <rect x="0" y="70" rx="5" ry="5" width="200" height="13" />
                <rect x="280" y="90" rx="10" ry="10" width="100" height="40" />
            </ContentLoader>
        </div>
    );
}

export default LessonItemLoader;
