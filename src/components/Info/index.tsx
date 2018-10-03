import * as React from "react";

import "./Info.scss";

export default class Info extends React.Component<any> {
    render() {
        return (
            <div className="info">
                <div className="oplist">
                    <div className="info__title">Which icons are missing?</div>
                    <div className="oplist__overview">
                        <div className="oplist__list">
                            <span>Attacker</span>
                            <ul>
                                <li><s>Ash</s></li>
                                <li><s>Blackbeard</s></li>
                                <li><s>Blitz</s></li>
                                <li><s>Buck</s></li>
                                <li><s>Capitao</s></li>
                                <li><s>Fuze</s></li>
                                <li><s>Glaz</s></li>
                                <li><s>IQ</s></li>
                                <li><s>Montagne</s></li>
                                <li><s>Sledge</s></li>
                                <li><s>Thatcher</s></li>
                                <li><s>Thermite</s></li>
                                <li><s>Twitch</s></li>
                            </ul>
                        </div>
                        <div className="oplist__list">
                            <span>Defender</span>
                            <ul>
                                <li><s>Bandit</s></li>
                                <li><s>Castle</s></li>
                                <li><s>Caviera</s></li>
                                <li><s>Doc</s></li>
                                <li><s>Frost</s></li>
                                <li><s>Jäger</s></li>
                                <li><s>Kapkan</s></li>
                                <li>Mute</li>
                                <li><s>Pulse</s></li>
                                <li><s>Rook</s></li>
                                <li>Smoke</li>
                                <li><s>Tachanka</s></li>
                                <li><s>Valkyrie</s></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="info__divider" />
                <div className="contribute">
                    <div className="info__title">How can I help?</div>
                    <p>If you know Adobe Illustrator and want to help this project, please read the <a href="https://github.com/MarcoPixel/r6-operatoricons/blob/master/CONTRIBUTING.MD">guidelines for contributing</a> first. We're glad for every person who can help us :)</p>
                    <div className="info__title">Links</div>
                    <div className="contribute__links">
                        <a href="https://github.com/MarcoPixel/r6-operatoricons">Github Repo</a>
                        <a href="https://github.com/MarcoPixel/r6-operatoricons/blob/master/LICENSE.MD">License</a>
                    </div>
                </div>
            </div>
        );
    }
}
