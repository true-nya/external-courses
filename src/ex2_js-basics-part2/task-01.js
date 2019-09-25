module.exports = function checkType(variable) {
    switch (typeof (variable)) {
        case 'string':
            return 'string';
            break;
        case 'number':
            return 'number';
            break;
        default:
            return undefined;
    };
}
