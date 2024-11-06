export const num = (num) => {
    let n = parseFloat(num);
    let converted = n > 0 ? n.toFixed(2) : 0;
    return converted
}