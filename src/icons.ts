import Icon from "./modules/icon";
import iconData from "../dist/icons.json";

// type definition
type Icons = keyof typeof iconData;
type IconObject = Record<Icons, Icon>;

/**
 * Many thanks to https://github.com/feathericons/feather for inspiring the code for this function
 */
const Icons = Object.keys(iconData)
    .map(item => new Icon(item, iconData[item]))
    .reduce(
        (object, icon) => {
            // eslint-disable-next-line no-param-reassign
            object[icon.name] = icon;
            return object;
        },
        {} as IconObject // set type for the object created by reduce
    );


export default Icons
