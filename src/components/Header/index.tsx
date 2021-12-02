import * as React from "react";
import pkg from "r6operators/package.json";
import { withPrefix } from "gatsby";
import "./header.scss";
import LOGO from "./logo.svg";

export default class Header extends React.Component {
  render(): JSX.Element {
    return (
      <div className="header">
        <div className="header__logo">
          <svg id="#logo" viewBox={LOGO.viewBox} width={LOGO.width} height={LOGO.height}>
            <use xlinkHref={`#${LOGO.id}`} />
          </svg>
        </div>
        <h1 className="header__title">r6operators</h1>
        <div className="header__subtitle">
          r6operators is a collection of high-quality vectorized Rainbow Six: Siege operator icons &
          metadata for Node.js
        </div>
        <div className="header__github">
          <a href="https://www.npmjs.com/package/r6operators">
            <img alt="npm" src="https://img.shields.io/npm/v/r6operators?style=for-the-badge" />
          </a>
          <a href="https://github.com/marcopixel/r6operators">
            <img src="https://img.shields.io/github/last-commit/marcopixel/r6operators.svg?style=for-the-badge" />
          </a>
          <a href="https://github.com/marcopixel/r6operators">
            <img src="https://img.shields.io/github/stars/marcopixel/r6operators.svg?style=for-the-badge" />
          </a>
          <a href="https://github.com/marcopixel/r6operators/network/members">
            <img src="https://img.shields.io/github/forks/marcopixel/r6operators.svg?style=for-the-badge" />
          </a>
          <a href="https://github.com/marcopixel/r6operators/subscription">
            <img src="https://img.shields.io/github/watchers/marcopixel/r6operators.svg?style=for-the-badge" />
          </a>
        </div>
        <div className="header__usage">
          <div className="header__usage--npm">
            <a href="https://www.npmjs.com/package/r6operators">
              <pre>npm install r6operators</pre>
            </a>
            <span>
              <a href="https://github.com/marcopixel/r6operators/blob/master/README.md#usage">
                Getting started
              </a>
              <a className="divider">|</a>
              <a href="https://github.com/marcopixel/r6operators#reference">Documentation</a>
            </span>
          </div>
          <div className="header__usage--download">
            <a className="button" href={withPrefix(`/r6operators-icons-${pkg.version}.zip`)}>
              Download
            </a>
            <span>SVG & PNG</span>
          </div>
        </div>
      </div>
    );
  }
}
