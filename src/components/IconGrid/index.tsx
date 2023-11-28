import * as React from "react";
import r6operators, { Operator } from "r6operators";
import { Search } from "react-feather";
import Dropdown, { Option as DropdownOption } from "react-dropdown-now";
import IconTile from "~components/IconTile";
import { IIcon } from "~components/Icon";

import "./icongrid.scss";

// interfaces
interface IIconGridProps {
  children?: React.ReactNode;
}
interface IIconGridState {
  inputValue: string;
  items: Array<any>;
  filter: string;
  sorter: string;
}
interface IICONSMap {
  [name: string]: IIcon;
}

// convert object to Array<Operator>
const initialItems: Array<Operator> = Object.values(r6operators);

// use sets for filtering
const roleFilter = new Set();
const orgFilter = new Set();

// iterate over initialItems to get roles and add them to the sets
for (const op of initialItems) {
  roleFilter.add(op.role);
  orgFilter.add(op.org);
}

// create filter object for dropdown
const dropdownFilters = [
  "None",
  {
    name: "Role",
    items: [...roleFilter].sort().map((x) => {
      return { value: x, label: x };
    }),
  },
  {
    name: "Org",
    items: [...orgFilter].sort().map((x) => {
      return { value: x, label: x };
    }),
  },
] as any;

const sortDropDownFilters = ["Default", "A-Z", "Z-A", "Newest", "Oldest"];

const getSeasonId = (shorthand: string) => {
  if (shorthand === "Release") return 0;

  const [year, season] = /Y(\d+)S(\d)/.exec(shorthand)?.slice(1).map(Number) as [number, number]
  return year === 0 ? 0 : year * 4 - 4 + season
}

const sorters = {
  'A-Z': (operators: Operator[]) => operators
    .toSorted((a, b) => a.name.localeCompare(b.name)),
  'Z-A': (operators: Operator[]) => operators
    .toSorted((a, b) => b.name.localeCompare(a.name)),
  'Newest': (operators: Operator[]) => operators
    .toSorted((a, b) => a.role.localeCompare(b.role)) // Role
    .toSorted((a, b) => a.org.localeCompare(b.org)) // Org
    .toSorted((a, b) => {
      return (b.meta ? getSeasonId(b.meta.season) : -1) - (a.meta ? getSeasonId(a.meta.season) : -1);
    }), // Season
  'Oldest': (operators: Operator[]) => operators
    .toSorted((a, b) => a.role.localeCompare(b.role)) // Role
    .toSorted((a, b) => a.org.localeCompare(b.org)) // Org
    .toSorted((a, b) => {
      return (a.meta ? getSeasonId(a.meta.season) : -1) - (b.meta ? getSeasonId(b.meta.season) : -1);
    }) // Season
};

const sortOperators = (operators: Operator[], sorter: string) => {
  return sorter in sorters ? sorters[sorter as keyof typeof sorters](operators) : operators;
};

// create GLYPHS object for svg sprite loader
const requestIcons = require.context("r6operators/dist/icons", true, /\.svg$/);
// eslint-disable-next-line unicorn/no-reduce
// const ICONS: IICONSMap = requestIcons.keys().reduce((glyphs, key) => {
//   const filename = path.basename(key, ".svg");
//   return { ...glyphs, [filename]: requestIcons(key).default };
// }, {});

export default class IconGrid extends React.Component<IIconGridProps, IIconGridState> {
  constructor(props: IIconGridProps) {
    super(props);
    // initial state
    this.state = {
      inputValue: "",
      items: initialItems,
      filter: "",
      sorter: "",
    };
    // bind functions
    this.updateInputValue = this.updateInputValue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  updateInputValue(event: React.ChangeEvent<HTMLInputElement>): void {
    const updatedList = initialItems.filter((x) =>
      x.name.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())
    );
    this.setState({ inputValue: event.target.value, filter: "", items: updatedList });
  }

  setFilter(option: any): void {
    if (option.value === "None") {
      // set empty state when "None" is selected
      this.setState({ inputValue: "", filter: option.value, items: initialItems });
    } else {
      const updatedList = initialItems.filter(
        (x) =>
          x.role.toString().toLowerCase() === option.value.toString().toLowerCase() ||
          x.org.toString().toLowerCase() === option.value.toString().toLowerCase()
      );
      this.setState({ inputValue: "", filter: option.value, items: updatedList });
    }
  }
  setSort(option: DropdownOption) {
    switch (option.value) {
      case "Default":
        this.setState({ sorter: "" });
        break;
      case "A-Z":
        this.setState({ sorter: option.value });
        break;
      case "Z-A":
        this.setState({ sorter: option.value });
        break;
      case "Newest":
        this.setState({ sorter: option.value });
        break;  
      case "Oldest":
        this.setState({ sorter: option.value });
        break;
      default:
        break;
    }
  }
  render(): JSX.Element {
    return (
      <div className="icongrid">
        <div className="icongrid__filters">
          <div className="icongrid__search">
            <Search />
            <input
              placeholder="Search icons"
              value={this.state.inputValue}
              onChange={this.updateInputValue}
            />
          </div>
          <Dropdown
            className="icongrid__dropdown"
            options={dropdownFilters}
            onChange={this.setFilter}
            value={this.state.filter}
            placeholder="Select an option"
          />
          <Dropdown
            className="icongrid__dropdown"
            options={sortDropDownFilters}
            onChange={this.setSort}
            value={this.state.sorter}
            placeholder="Sort"
          />
        </div>
        <div
          className={
            this.state.items.length === 0 ? "icongrid__container is-empty" : "icongrid__container"
          }
        >
          {sortOperators(this.state.items, this.state.sorter).map((x) => (
            <IconTile key={x.id} object={x} />
          ))}
          {this.state.items.length === 0 ? (
            <div className="icongrid__empty">
              No results found for {this.state.inputValue || this.state.filter}
            </div>
          ) : undefined}
        </div>
      </div>
    );
  }
}
