import * as React from "react";
import { withPrefix } from "gatsby-link";
import Dropdown from "react-dropdown";
import IconTile from "components/IconTile";
import ReactGA from "react-ga";

import "./IconGrid.scss";

// import JSON
import data from "icons.json";
import Icon, { ICON } from "components/Icon";

interface IIconGridState {
    inputValue: string;
    items: any;
    filter: string;
}
interface IGLYPHMap {
    [name: string]: {
        content: string;
        viewBox: string;
        id: string;
        node: SVGSymbolElement;
    };
}

// create GLYPHS object for svg sprite loader
const reqIcons = require.context("../../../static/icons/svg", true, /\.svg$/);
const GLYPHS: IGLYPHMap = reqIcons.keys().reduce((glyphs, key) => {
    const filename = key.match(new RegExp(/[^/]+(?=\.svg$)/))![0];
    return { ...glyphs, [filename]: reqIcons(key).default };
}, {});

// remap json object to array
const initialItems = Object.entries(data).map(([key, value]) => ({
    id: key,
    displayName: value.displayName,
    role: value.role,
    unit: value.unit
}));

const filters = [
    "None",
    {
        type: "group",
        name: "Role",
        items: ["Attacker", "Defender", "Recruit"]
    },
    {
        type: "group",
        name: "Unit",
        items: [
            "GIGN",
            "SAS",
            "GSG9",
            "FBI",
            "SPETSNAZ",
            "JTF-2",
            "SEALS",
            "BOPE",
            "SAT",
            "GEO",
            "GROM",
            "SASR",
            "SDU",
            "SMB",
            "CBRN",
            "GIS",
            "GSUTR",
            "GIGR",
            "JAEGER CORPS"
        ]
    }
];

// grid component
export default class IconGrid extends React.PureComponent<{}, IIconGridState> {
    constructor(props) {
        super(props);
        // initial state
        this.state = {
            inputValue: "",
            items: initialItems,
            filter: ""
        };
        // bind functions
        this.updateInputValue = this.updateInputValue.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    updateInputValue(e) {
        let updatedList = initialItems;
        updatedList = updatedList.filter(
            x =>
                x.displayName
                    .toString()
                    .toLowerCase()
                    .indexOf(e.target.value.toString().toLowerCase()) > -1
        );
        this.setState({ inputValue: e.target.value, filter: "", items: updatedList });
    }

    setFilter(option) {
        if (option.value === "None") {
            ReactGA.event({
                category: `Filter`,
                action: `Cleared filter`,
            });
            // set empty state when "None" is selected
            this.setState({ inputValue: "", filter: option.value, items: initialItems });
        } else {
            let updatedList = initialItems;
            updatedList = updatedList.filter(
                x =>
                    x.role
                        .toString()
                        .toLowerCase()
                        .indexOf(option.value.toString().toLowerCase()) > -1 ||
                    x.unit
                        .toString()
                        .toLowerCase()
                        .indexOf(option.value.toString().toLowerCase()) > -1
            );
            ReactGA.event({
                category: `Filter`,
                action: `Changed filter`,
                label: `${option.value}`
            });
            this.setState({ inputValue: "", filter: option.value, items: updatedList });
        }
    }
    render() {
        return (
            <div className="icongrid">
                <div className="icongrid__filters">
                    <div className="icongrid__search">
                        <Icon glyph={ICON.SEARCH} />
                        <input
                            placeholder="Search icons"
                            value={this.state.inputValue}
                            onChange={this.updateInputValue}
                        />
                    </div>
                    <Dropdown
                        className="icongrid__dropdown"
                        options={filters}
                        onChange={this.setFilter}
                        value={this.state.filter}
                        placeholder="Select an option"
                    />
                </div>
                <div className="icongrid__container">
                    {this.state.items.map(x => (
                        <IconTile
                            key={x.id}
                            displayName={x.displayName}
                            role={x.role}
                            unit={x.unit}
                            glyph={GLYPHS[x.id]}
                            svgFile={withPrefix(`/icons/svg/${x.id}.svg`)}
                            pngFile={withPrefix(`/icons/png/${x.id}.png`)}
                            aiFile={withPrefix(`/icons/ai/${x.id}.ai`)}
                            zipFile={withPrefix(`/icons/zip/${x.id}.zip`)}
                        />
                    ))}
                    {this.state.items.length === 0 ? (
                        <div className="icongrid__empty">
                            No results found for "{this.state.inputValue || this.state.filter}"
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
