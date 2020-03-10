import * as React from "react";

export interface IIcon {
  content: string;
  viewBox: string;
  id: string;
  node: SVGSymbolElement;
}
interface IIconProps {
  glyph: IIcon;
}

export default class Icon extends React.PureComponent<IIconProps> {
  render(): JSX.Element {
    return (
      <svg className={`icon ${this.props.glyph.id}`} viewBox={this.props.glyph.viewBox}>
        <use xlinkHref={`#${this.props.glyph.id}`} />
      </svg>
    );
  }
}
