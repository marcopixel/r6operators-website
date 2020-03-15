import * as React from "react";

import MainLayout from "~layouts/main";
import Header from "~components/Header";
import Footer from "~components/Footer";
import IconGrid from "~components/IconGrid";

export default class IndexPage extends React.Component {
  render(): JSX.Element {
    return (
      <MainLayout>
        <Header />
        <IconGrid />
        <Footer />
      </MainLayout>
    );
  }
}
