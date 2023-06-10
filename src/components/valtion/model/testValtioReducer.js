const {benchModel} = require('../../../context/jsversion/testStateManage');
const { getType } = require('../../../context/jsversion/libs');

const { proxy, subscribe } =require("valtio");


getState = (model) => {
    const state = {};
    Object.keys(model).forEach((key) => {
        const value = model[key];
        const type = getType(value);
        if (type !== 'Function' && type !== 'GeneratorFunction') {
            state[key] = model[key];
        }
    });
    // return a deep copy of state
    return (state);

};

const valtioBuildReducers = (model,proxy) => {
 
    
    Object.keys(model).forEach((key) => {
        const type = getType(model[key]);
        if (type === 'Function' || type === 'GeneratorFunction') {
            proxy[key] = (v) => {
                const method = model[key];
                const oldState = getState(proxy);
                const newState = method(oldState, v);
                // assign only changed oldState values to this
                Object.keys(newState).forEach((k) => {
                    if (proxy[k] &&
                        JSON.stringify(proxy[k]) !== JSON.stringify(newState[k])) {
                            proxy[k] = newState[k];
                    }
                }
                );
            };
            
        }
    });
    
}

const proxyv=proxy(benchModel);
valtioBuildReducers(benchModel,proxyv);

console.log(proxyv.property1,proxyv.property2);

// console.log(proxyv);

subscribe(proxyv,(op)=>{
    console.log(op);
    console.log(proxyv.property1);
    console.log(proxyv.property2);
});

proxyv.method2();
proxyv.method2();
proxyv.method1("-777=");

// console.log(proxyv);
