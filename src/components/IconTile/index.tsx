import * as React from "react";
import Icon from "components/Icon";

import "./IconTile.scss";

interface IIconTileProps {
    key: string;
    displayName: string;
    role: string;
    unit: string;
    glyph: {
        content: string;
        viewBox: string;
        id: string;
        node: SVGSymbolElement;
    };
    svgFile: string;
    pngFile: string;
    aiFile: string;
    zipFile: string;
}
export default class IconTile extends React.Component<IIconTileProps, any> {
    render() {
        return (
            <div className={`iconTile ${this.props.displayName}`}>
                <Icon glyph={this.props.glyph} />
                <div className="iconTile__content">
                    <div className="iconTile__name">{this.props.displayName}</div>
                    <div className="iconTile__postcontent">
                        <a href={this.props.svgFile} download>SVG</a>
                        <a href={this.props.pngFile} download>PNG</a>
                        <a href={this.props.aiFile} download>AI</a>
                        <a href={this.props.zipFile} download>ZIP</a>
                    </div>
                </div>
            </div>
        );
    }
}
