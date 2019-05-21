import * as React from "react";
import { withPrefix } from "gatsby-link";
import { version } from "../../../package.json";
import ReactGA from "react-ga";
import Icon, { ICON } from "components/Icon";
import GitHubButton from "react-github-btn";

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
                <div className="header__github">
                    <img src="https://img.shields.io/github/last-commit/MarcoPixel/r6-operatoricons.svg?style=for-the-badge" />
                    <a href="https://github.com/marcopixel/r6-operatoricons">
                        <img src="https://img.shields.io/github/stars/MarcoPixel/r6-operatoricons.svg?style=for-the-badge" />
                    </a>
                    <a href="https://github.com/marcopixel/r6-operatoricons/network/members">
                        <img src="https://img.shields.io/github/forks/MarcoPixel/r6-operatoricons.svg?style=for-the-badge" />
                    </a>
                    <a href="https://github.com/marcopixel/r6-operatoricons/subscription">
                        <img src="https://img.shields.io/github/watchers/MarcoPixel/r6-operatoricons.svg?style=for-the-badge" />
                    </a>
                </div>
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
