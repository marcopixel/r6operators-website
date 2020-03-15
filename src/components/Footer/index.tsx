import * as React from "react";

import "./footer.scss";

export default class Footer extends React.Component {
  render(): JSX.Element {
    return (
      <div className="footer">
        <span>
          Made with ❤️ by <a href="https://github.com/marcopixel">@marcopixel</a>
        </span>
        <div className="footer__legal">
          <span>
            r6operators licensed under{" "}
            <a href="https://github.com/marcopixel/r6operators/blob/master/LICENSE">MIT License</a>
          </span>
          <span>
            This project is not affiliated with Ubisoft Entertainment. Tom Clancy’s, Rainbow Six,
            The Soldier Icon, Ubisoft and the Ubisoft logo are trademarks of Ubisoft Entertainment.
          </span>
        </div>
      </div>
    );
  }
}
