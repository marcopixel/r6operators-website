import * as React from "react";

interface IMainLayout {
  children?: React.ReactNode;
}

export default class MainLayout extends React.Component<IMainLayout> {
  render(): JSX.Element {
    return (
      <div className="app__content">
        {this.props.children}
        <span>Test</span>
      </div>
    );
  }
}
