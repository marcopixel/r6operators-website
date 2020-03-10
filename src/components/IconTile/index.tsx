import * as React from "react";
import Icon, { IIcon } from "~components/Icon";
import { Operator } from "r6operators/src/modules/operator";

import "./icontile.scss";

interface IIconTileProps {
  icon: IIcon;
  object: Operator;
}

export default class IconTile extends React.Component<IIconTileProps> {
  render(): JSX.Element {
    return (
      <div className={`iconTile ${this.props.object.name}`}>
        <Icon glyph={this.props.icon} />
        <div className="iconTile__content">
          <div className="iconTile__content--wrap">
            <div className="iconTile__name">
              <span>{this.props.object.name}</span>
            </div>
            <div className="iconTile__download">
              <a>PNG</a>
              <a>SVG</a>
              <a>ZIP</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
