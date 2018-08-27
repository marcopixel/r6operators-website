import * as React from "react";

import LOGO from "logo.svg";
import SEARCH from "feather-icons/dist/icons/search.svg";

const ICON = {
    LOGO,
    SEARCH
};

interface IIconProps {
    glyph: {
        content: string;
        viewBox: string;
        id: string;
        node: SVGSymbolElement;
    };
    preserveAspectRatio?: string;
    fill?: string;
    stroke?: string;
    width?: string | number;
    height?: string | number;
}
export default class Icon extends React.Component<IIconProps, {}> {
    render() {
        return (
            <svg
                className={`icon ${this.props.glyph.id}`}
                viewBox={this.props.glyph.viewBox}
                preserveAspectRatio={this.props.preserveAspectRatio}
                fill={this.props.fill}
                stroke={this.props.stroke}
                width={this.props.width}
                height={this.props.height}
            >
                <use xlinkHref={`#${this.props.glyph.id}`} />
            </svg>
        );
    }
}

export { ICON };