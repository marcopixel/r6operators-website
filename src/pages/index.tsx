import * as React from "react";

import MainLayout from "~layouts/main";
import IconGrid from "~components/IconGrid";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    return (
      <MainLayout>
        <IconGrid />
      </MainLayout>
    );
  }
}
