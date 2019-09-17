/* eslint-disable react/static-property-placement */
import cheerio from "cheerio";
import classnames from "classnames";

/**
 * Convert attributes object to string of HTML attributes.
 * @param {Object} attributes - Object containing the attributes.
 * @returns {string}
 */
function attributesToString(attributes: IconContents["attributes"]) {
    return Object.keys(attributes)
        .map(key => `${key}="${attributes[key]}"`)
        .join(" ");
}

// interface for the Icon contents
interface IconContents {
    readonly displayName: string;
    readonly contents: string;
    readonly role: "Attacker" | "Defender";
    readonly unit: string;
    readonly attributes: {
        [key: string]: unknown;
    };
}

/** Class representing an icon. */
export default class Icon {
    /**
     * Name of the icon.
     * @example
     * console.log(icons.alibi.name)
     * // alibi
     */
    readonly name: string;

    /**
     * String containing the full name of the operator.
     * @example
     * console.log(icons.alibi.displayName)
     * // Alibi
     */
    readonly displayName: string;

    /** String containing the SVG element.
     * @example
     * console.log(icons.alibi.contents)
     * // <svg {...}
     */
    readonly contents: IconContents["contents"];

    /** Role of the icon.
     * @example
     * console.log(icons.alibi.role)
     * // Defender
     */
    readonly role: IconContents["role"];

    /** Unit of the icon.
     * @example
     * console.log(icons.alibi.unit)
     * // GIS
     */
    readonly unit: IconContents["unit"];

    /** Object containing the existing attributes of the icon.
     * @example
     * console.log(icons.alibi.attributes)
     * // { <attribute>: <value>, {...} }
     */
    readonly attributes: IconContents["attributes"];

    /**
     * Creates an instance of Icon.
     * @param name Name of the icon.
     * @param contents Contents of the icon.
     */
    constructor(name: string, contents: IconContents) {
        this.name = name;
        this.displayName = contents.displayName;
        this.role = contents.role;
        this.unit = contents.unit;

        // get attributes + values of SVGElement
        const $ = cheerio.load(`${contents.contents}`);
        this.attributes = {
            ...$("svg").get(0).attribs,
            ...{ class: `r6ops r6ops-${this.name}` }
        };
        this.contents = $("svg").html();
    }

    /**
     * Returns the current icon as an SVG string.
     * @returns String containing the SVG element.
     */
    toSVG(userAttributes): string {
        const combinedAttributes: IconContents["attributes"] = {
            ...this.attributes,
            ...userAttributes,
            ...{ class: classnames(this.attributes.class, userAttributes.class) }
        };
        return `<svg ${attributesToString(combinedAttributes)}>${this.contents}</svg>`;
    }
}
