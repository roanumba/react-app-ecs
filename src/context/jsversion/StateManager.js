const BaseMode = require('./BaseMode');
const { getType } = require('./libs');


const existingInstances = {}


// write a function createContext to create a model
function createContext(props) {
    const buildInstance = (props) => {

        const names = [];
        Object.keys(props).forEach((k) => {
            names.push(k);
        });

        names.sort();
        const modelName = names.join("_");
        if (modelName === "") {
            throw new Error("Cannot create store view from an empty model");
        }
        return modelName;

    }

    const modelName = buildInstance(props);
    let instance = existingInstances[modelName];
    if (instance) {
        return instance;
    }
    const claz = class extends BaseMode {
        constructor() {
            super();
            Object.keys(props).forEach((key) => {
                const type = getType(props[key]);
                this[`_${key}`] = props[key];
                if (type === 'Function' || type === 'GeneratorFunction') {
                    this[key] = (v) => {
                        const old = this[`_${key}`];
                        const cloneState = this.getState();
                        const newState = old(cloneState, v);
                        // assign only changed cloneState values to this
                        Object.keys(newState).forEach((k) => {
                            if (this[k] &&
                                JSON.stringify(this[k]) !== JSON.stringify(newState[k])) {
                                this[k] = newState[k];
                            }
                        }
                        );
                    };
                    return;
                }
                Object.defineProperty(this, key, {
                    get: () => this[`_${key}`],
                    set: (value) => {
                        const old = this[`_${key}`];
                        this[`_${key}`] = value;
                        this.dispatch(key,old, value);
                    },
                });
            });
        }
    }
    instance = new claz();
    existingInstances[modelName] = instance;
    console.log(instance.property1, instance.property2,);
    return instance;
}
module.exports = createContext;