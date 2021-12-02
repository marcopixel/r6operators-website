import * as React from "react";
import r6operators from "r6operators";
import SVG from "react-inlinesvg";
export interface IIcon {
  content: string;
  viewBox: string;
  id: string;
  node: SVGSymbolElement;
}
interface IIconProps {
  id: string;
}
export default class Icon extends React.PureComponent<IIconProps> {
  render(): JSX.Element {
    return <SVG src={r6operators[this.props.id].toSVG()}></SVG>;
  }
}
