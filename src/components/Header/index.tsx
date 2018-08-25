import * as React from "react";
import { withPrefix } from "gatsby-link";

import "./header.scss";
import Icon, { ICON } from "components/Icon";

export default class Header extends React.Component<any> {
    render() {
        return (
            <div className="header">
                <div className="header__logo">
                    <Icon glyph={ICON.LOGO} />
                </div>
                <div className="header__title">r6-operatoricons</div>
                <div className="header__subtitle">Rainbow Six: Siege operator icons in SVG, PNG and AI.</div>
                <div className="header__downloadAll">
                    <a className="button secondary" href={withPrefix(`/assets/r6-operatoricons.zip`)}>
                        Download
                    </a>
                    <span>SVG, PNG and AI</span>
                </div>
            </div>
        );
    }
}
