import * as React from "react";
import r6operators from "r6operators";
import Icon from "~components/Icon";

import "./icontile.scss";

interface IIconTileProps {
  id: string;
}
export default class IconTile extends React.Component<IIconTileProps> {
  render(): JSX.Element {
    return (
      <div className="iconTile">
        <Icon id={this.props.id} {...r6operators[this.props.id].svg.attributes} />
      </div>
    );
  }
}
