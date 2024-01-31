
// Option parsers

export const parseEmptyType = (value: string, previous: null | undefined) => {
    return true;
};
export const parseToSingleNumber = (value: string, previous: number | null | undefined) => {
    return parseInt(value);
};
export const parseToSingleString = (value: string, previous: string | null | undefined) => {
    return value;
};
export const parseToNumberList = (value: string, previous: number[] | null | undefined) => {
    const result = previous || [];
    result.push(parseInt(value));
    return result;
};
export const parseUnsupportedType = (value: string, previous: any | null | undefined) => {
    throw new Error(`Unsupported type`);
};

// Option validators

export const validateRequired = (
    options: any,
    name: string
) => {
    if (typeof options[name] === "undefined" || !options[name]) {
        return [`Missing required option --${name}`];
    }
    return true;
};

export const validateNumberMin = (minValue: number) => (
    options: any,
    name: string
) => {
    if (typeof options[name] === "undefined" || (!options[name] && options[name] !== 0)) {
        // Allow empty values
        return true;
    }
    if (typeof options[name] !== "number") {
        return [`Option --${name} must be a number`];
    }
    if (options[name] < minValue) {
        return [`Option --${name} must be at least ${minValue}`];
    }
    return true;
};

export const validateNumberMax = (maxValue: number) => (
    options: any,
    name: string
) => {
    if (typeof options[name] === "undefined" || (!options[name] && options[name] !== 0)) {
        // Allow empty values
        return true;
    }
    if (typeof options[name] !== "number") {
        return [`Option --${name} must be a number`];
    }
    if (options[name] > maxValue) {
        return [`Option --${name} must be at most ${maxValue}`];
    }
    return true;
};

export const validateStringLengthMin = (minLength: number) => (
    options: any,
    name: string
) => {
    if (typeof options[name] === "undefined" || !options[name]) {
        // Allow empty values
        return true;
    }
    if (typeof options[name] !== "string") {
        return [`Option --${name} must be a string`];
    }
    if (options[name].length < minLength) {
        return [`Option --${name} must be at least ${minLength} characters long`];
    }
    return true;
};

export const validateStringLengthMax = (maxLength: number) => (
    options: any,
    name: string
) => {
    if (typeof options[name] === "undefined" || !options[name]) {
        // Allow empty values
        return true;
    }
    if (typeof options[name] !== "string") {
        return [`Option --${name} must be a string`];
    }
    if (options[name].length > maxLength) {
        return [`Option --${name} must be at most ${maxLength} characters long`];
    }
    return true;
};
