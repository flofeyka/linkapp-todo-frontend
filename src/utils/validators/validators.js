export const required = value => {
    if(value) return undefined;
    return " ";
}

export const maxLengthCreator = (maxValue) => (value) => {
    if (value.length > maxValue) return `Max length is ${maxValue} symbols`;
    return undefined;
}

export const minLengthCreator = (minValue) => (value) => {
    if (value.length < minValue) return `Min length is ${minValue} symbols`;
    return undefined;
}