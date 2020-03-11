/* eslint-disable unicorn/consistent-function-scoping */
import * as React from "react";
import { withPrefix } from "gatsby-link";
import Icon, { IIcon } from "~components/Icon";
import { Operator } from "r6operators/src/modules/operator";

import "./icontile.scss";

interface IIconTileProps {
  icon: IIcon;
  object: Operator;
}

// function to create link element
function targetFile(id: string, extension: string): JSX.Element {
  return (
    <a
      href={withPrefix(`./icons/${extension}/${id}.${extension}`)}
      title={`Download ${id}.${extension}`}
      download
    >
      {extension.toString().toUpperCase()}
    </a>
  );
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
              {targetFile(this.props.object.id, "png")}
              {targetFile(this.props.object.id, "svg")}
              {targetFile(this.props.object.id, "zip")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
