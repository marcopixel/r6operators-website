import * as React from "react";
import Icon from "components/Icon";
import ReactGA from "react-ga";

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
    constructor(props) {
        super(props);
        // bind functions
        this.logAction = this.logAction.bind(this);
    }
    logAction(iconFile, iconType) {
        ReactGA.event({
            category: `Download`,
            action: `Downloaded an ${iconType} icon`,
            label: `${iconFile}`,
          });
    }
    render() {
        return (
            <div className={`iconTile ${this.props.displayName}`}>
                <Icon glyph={this.props.glyph} />
                <div className="iconTile__content">
                    <div className="iconTile__name"><span>{this.props.displayName}</span></div>
                    <div className="iconTile__postcontent">
                        <a href={this.props.svgFile} title={`Download ${this.props.displayName}.svg`} onClick={e => this.logAction(this.props.displayName + ".svg", "SVG")} download>
                            SVG
                        </a>
                        <a href={this.props.pngFile} title={`Download ${this.props.displayName}.png`} onClick={e => this.logAction(this.props.displayName + ".png", "PNG")} download>
                            PNG
                        </a>
                        <a href={this.props.aiFile} title={`Download ${this.props.displayName}.ai`} onClick={e => this.logAction(this.props.displayName + ".ai", "AI")} download>
                            AI
                        </a>
                        <a href={this.props.zipFile} title={`Download ${this.props.displayName}.zip`} onClick={e => this.logAction(this.props.displayName + ".zip", "ZIP")} download>
                            ZIP
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
