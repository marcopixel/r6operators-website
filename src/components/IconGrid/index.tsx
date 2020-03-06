import * as React from "react";
import r6operators from "r6operators";
import { Operator } from "r6operators/src/modules/operator";
import Dropdown, { Group, Option } from "react-dropdown-now";

// interfaces
interface IIconGridProps {
  children?: React.ReactNode;
}
interface IIconGridState {
  inputValue: string;
  items: Array<Operator>;
  filter: string;
}

// convert object to Array<Operator>
const initialItems: Array<Operator> = Object.values(r6operators);

// use sets for filtering
const roleFilter = new Set();
const unitFilter = new Set();

// iterate over initialItems to get roles and add them to the sets
for (const op of initialItems) {
  roleFilter.add(op.role);
  unitFilter.add(op.unit);
}

// create filter object for dropdown
const dropdownFilters = [
  "None",
  {
    type: "group",
    name: "Role",
    items: [...roleFilter]
  } as Group,
  {
    type: "group",
    name: "Unit",
    items: [...unitFilter]
  } as Group
];

export default class IconGrid extends React.Component<IIconGridProps, IIconGridState> {
  constructor(props: IIconGridProps) {
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

  updateInputValue(event: React.ChangeEvent<HTMLInputElement>): void {
    const updatedList = initialItems.filter(x =>
      x.name
        .toString()
        .toLowerCase()
        .includes(event.target.value.toString().toLowerCase())
    );
    this.setState({ inputValue: event.target.value, items: updatedList });
  }

  setFilter(option: Option): void {
    const updatedList = initialItems.filter(
      x =>
        x.role.toString().toLowerCase() === option.value.toString().toLowerCase() ||
        x.unit.toString().toLowerCase() === option.value.toString().toLowerCase()
    );
    this.setState({ filter: option.value, items: updatedList });
  }

  render(): JSX.Element {
    return (
      <div className="iconGrid">
        <div className="icongrid__filters">
          <div className="icongrid__search">
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
        </div>
        {this.state.items.map(x => (
          <div key={x.id}>{x.name}</div>
        ))}
      </div>
    );
  }
}
