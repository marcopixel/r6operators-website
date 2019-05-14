import * as React from "react";
import { withPrefix } from "gatsby-link";
import { version } from "../../../package.json";
import ReactGA from "react-ga";
import Icon, { ICON } from "components/Icon";

import "./header.scss";

export default class Header extends React.Component<any> {
    constructor(props) {
        super(props);
        // bind functions
        this.logDownload = this.logDownload.bind(this);
    }
    logDownload() {
        ReactGA.event({
            category: `Download`,
            action: `Downloaded full package`,
            label: `r6-operatoricons-${version}.zip`
        });
    }
    render() {
        return (
            <div className="header">
                <div className="header__logo">
                    <Icon glyph={ICON.LOGO} />
                </div>
                <div className="header__title">r6-operatoricons</div>
                <div className="header__subtitle">Rainbow Six: Siege operator icons in SVG, PNG and AI.</div>
                <div className="header__downloadAll">
                    <a
                        className="button secondary"
                        href={withPrefix(`/r6-operatoricons-${version}.zip`)}
                        onClick={e => this.logDownload()}
                    >
                        Download
                    </a>
                    <span>SVG, PNG and AI</span>
                </div>
            </div>
        );
    }
}
