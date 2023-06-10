// write a function getType to return the type of a variable
const getType = (variable) => {
    return Object.prototype.toString.call(variable).slice(8, -1);
};

module.exports = { 
    getType
};