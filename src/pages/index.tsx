import * as React from "react";

import MainLayout from "~layouts/mainLayout";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    return (
      <MainLayout>
        <div>Hello world!</div>
      </MainLayout>
    );
  }
}
