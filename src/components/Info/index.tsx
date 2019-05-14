import * as React from "react";
import { OutboundLink } from "react-ga";

import "./Info.scss";

export default class Info extends React.Component<any> {
    render() {
        return (
            <div className="info">
                <div className="contribute">
                    <div className="info__title">How can I help?</div>
                    <p>
                        If you know Adobe Illustrator and want to help this project, please read the{" "}
                        <OutboundLink
                            eventLabel="https://github.com/MarcoPixel/r6-operatoricons/blob/master/CONTRIBUTING.MD"
                            to="https://github.com/MarcoPixel/r6-operatoricons/blob/master/CONTRIBUTING.MD">
                            guidelines for contributing
                        </OutboundLink>{" "}
                        first. We're glad for every person who can help us :)
                    </p>
                </div>
                <div className="info__divider" />
                <div className="contribute">
                    <div className="info__title">Links</div>
                    <div className="contribute__links">
                        <OutboundLink eventLabel="https://github.com/MarcoPixel/r6-operatoricons" to="https://github.com/MarcoPixel/r6-operatoricons">Github Repo</OutboundLink>
                        <OutboundLink eventLabel="https://creativecommons.org/licenses/by/4.0/" to="https://creativecommons.org/licenses/by/4.0/">License</OutboundLink>
                    </div>
                </div>
            </div>
        );
    }
}
