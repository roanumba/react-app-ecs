const existingInstances = {}



class BaseMode {
    subscribe = (watchList, listener) => {
        const watchType = getType(watchList);

        if (typeof listener === 'function' && (watchType === 'Array' || watchType === 'String')) {
            const fn = listener.toString().replace(/\s/g, '');
            const lstns = this.listeners.find((l) => l.toString().replace(/\s/g, '') === fn);
            if (!lstns) {
                if (watchType === 'String') {
                    watchList = watchList.split(',');
                }
                watchList = watchList.map((item) => item.trim());
                this.listeners.push({ listener, watchList });
            }
        }
        return () => this.unsubscribe(listener);

    }

    unsubscribe = (listener) => {
        this.listeners = this.listeners.filter((l) => l.listener !== listener);
    }

    dispatch = (old, value) => {
        // console.log('dispatch',old,value);
        if (old === value) return;
        this.listeners.forEach((l) => {
            const { listener, watchList } = l;

            const state = {}
            watchList.forEach((key) => {
                state[key] = this[key];
            });
            listener(state);
        });
    }
    getState = () => {
        const state = {}
        Object.keys(this).forEach((key) => {
            const value = this[key];
            const type = getType(value);
            if (key.startsWith('_') && type !== 'Function' && type !== 'GeneratorFunction') {
                state[key.slice(1)] = this[key];
            }
        });
        // return a deep copy of state
        return structuredClone(state);

    }

    listeners = [];
}


const buildInstance = (props) => {

    const names = [];
    Object.keys(props).forEach((k) => {
        names.push(k);
    });

    names.sort();
    modelName = names.join("_");
    if (modelName === "") {
        throw new Error("Cannot create store view from an empty model");
    }
    return existingInstances[modelName];

}
// write a function createModel to create a model
function createModel(props) {
    let instance = buildInstance(props);
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
                        this.dispatch(old, value);
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

// write a function getType to return the type of a variable
const getType = (variable) => {
    return Object.prototype.toString.call(variable).slice(8, -1);
};

//---------------------test---------------------
const model = {
    property1: 'test',
    property2: 10,
    arrayProperty1: {
        a: [5, "five", { b: 6, c: 7, d: [8, 9, 10], e: { f: 11, g: 12 } },
        ]
    },
    booleanProperty1: true,
    dateProperty1: new Date(),
    method1: (s, v) => {
        s.property1 = v + '199- 99';
        s.anewProperty = 'new';
        return s;
    },
    method2: () => { },
    *generator1() { },
    *generator2() { },
}

const testModel = createModel(model);
const testModel2 = createModel(model);

// const state=testModel.getState();
// console.log(state);

const un = testModel.subscribe("property1, property2", (state) => {
    console.log(state);
});
testModel.method1('123-4');

testModel2.subscribe(["property1", "dateProperty1"], (state) => {
    console.log(state);
});

testModel2.property1 = 'test1';
testModel.property2 = 20;
// console.log(testModel2.property1,testModel2.property2);

testModel.property1 = 'test11';
testModel2.property2 = 201;
// console.log(testModel2.property1,testModel2.property2);