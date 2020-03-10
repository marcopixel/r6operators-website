import * as React from "react";
import Icon, { IIcon } from "~components/Icon";

import "./icontile.scss";

interface IIconTileProps {
  icon: IIcon;
}
export default class IconTile extends React.Component<IIconTileProps> {
  render(): JSX.Element {
    return (
      <div className="iconTile">
        <Icon glyph={this.props.icon} />
      </div>
    );
  }
}
