import * as React from "react";

import "./icontile.scss";

interface IIconTileProps {
  id: string;
}
export default class IconTile extends React.Component<IIconTileProps> {
  render(): JSX.Element {
    return <div className="iconTile">{this.props.id}</div>;
  }
}
