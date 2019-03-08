import * as React from "react";

import "./Info.scss";

export default class Info extends React.Component<any> {
    render() {
        return (
            <div className="info">
                <div className="contribute">
                    <div className="info__title">How can I help?</div>
                    <p>
                        If you know Adobe Illustrator and want to help this project, please read the{" "}
                        <a href="https://github.com/MarcoPixel/r6-operatoricons/blob/master/CONTRIBUTING.MD">
                            guidelines for contributing
                        </a>{" "}
                        first. We're glad for every person who can help us :)
                    </p>
                </div>
                <div className="info__divider" />
                <div className="contribute">
                    <div className="info__title">Links</div>
                    <div className="contribute__links">
                        <a href="https://github.com/MarcoPixel/r6-operatoricons">Github Repo</a>
                        <a href="https://creativecommons.org/licenses/by/4.0/">License</a>
                    </div>
                </div>
            </div>
        );
    }
}
