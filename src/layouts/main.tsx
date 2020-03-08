import * as React from "react";

import "./main.scss";

interface IMainLayout {
  children?: React.ReactNode;
}

export default class MainLayout extends React.Component<IMainLayout> {
  render(): JSX.Element {
    return <div className="app__content">{this.props.children}</div>;
  }
}
