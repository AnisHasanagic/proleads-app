import React, { Suspense, useEffect, useState } from "react";

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import "./WebinarModal.scss";

const ReactPlayer = React.lazy(() => import("react-player/lazy"));

function WebinarModal({ webinar }: any) {
    if (!webinar) return null;

    return (
        <div id="webinar-modal">
            <div className="video">
                <Suspense fallback={<div>Loading...</div>}>
                    <ReactPlayer
                        controls
                        width={"100%"}
                        height={"100%"}
                        url={[
                            {
                                src: `${process.env.REACT_APP_API_VIDEOS}/${webinar.video_url}`,
                                type: "video/mp4",
                            },
                        ]}
                        fallback={<>...</>}
                    />
                </Suspense>
            </div>
            <div className="details flex mt-4">
                <div className="title mr-auto">
                    <h1>{webinar.title}</h1>
                    <p>{webinar.description}</p>
                </div>
                <p className="ml-2 time">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {moment(webinar.starts_at).format("LLL")}
                </p>
            </div>
        </div>
    );
}

export default WebinarModal;
