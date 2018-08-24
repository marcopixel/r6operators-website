import * as React from "react";
import { withPrefix } from "gatsby-link";

import "./header.scss";

export default class Header extends React.Component<any> {
    render() {
        return (
            <div className="header">
                <div className="header__title">r6-operatoricons</div>
                <div className="header__subtitle">Rainbow Six: Siege operator icons in SVG, PNG and AI.</div>
                <div className="header__disclaimer"><b>Disclaimer:</b> The icons available to download here are remade by hand in Adobe Illustrator and might have slight differences to the original raster icons.</div>
                <div className="header__downloadAll">
                    <a href={withPrefix(`/assets/r6-operatoricons.zip`)}>Download</a>
                </div>
            </div>
        );
    }
}