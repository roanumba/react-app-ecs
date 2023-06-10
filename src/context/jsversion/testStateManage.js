
const createContext = require('./StateManager');

//---------------------test model---------------------
const benchModel = {
    property1: 'test--',
    property2: 10,
    arrayProperty1: {
        a: [5, "five", { b: 6, c: 7, d: [8, 9, 10], e: { f: 11, g: 12 } },
        ]
    },
    booleanProperty1: true,
    dateProperty1: new Date(),
    method1: (s, v) => {
        s.property1 += v + '199- 99';
        s.anewProperty = 'new';
        return s;
    },
    method2: (s) => {
        s.property2 *= 10;
        return s;
     },
     
    *generator1() { },
    *generator2() { },
}
module.exports = {benchModel};

//---------------------test---------------------
const start = ()=>{
    const model2= {
        navigator: {path: '#',state:{}},
        
    }
    const testModel = createContext(benchModel);
    const testModel2 = createContext(benchModel);
    const global = createContext(model2);
    
    // const state=testModel.getState();
    // console.log(state);
    console.log(global.navigator);
    global.subscribe("navigator", (state) => {
        console.log(state);
    });
    
    const un = testModel.subscribe("property1, property2", (state) => {
        console.log(state);
    });
    testModel.method1('123-4');
    // un();
    testModel2.subscribe(["property1", "dateProperty1"], (state) => {
        console.log(state);
    });
    
    testModel2.property1 = 'test1';
    testModel.property2 = 20;
    // console.log(testModel2.property1,testModel2.property2);
    global.navigator = {path:'/',state:{a:1,b:2}};
    
    testModel.property1 = 'test11';
    testModel2.property2 = 201;
    // console.log(testModel2.property1,testModel2.property2);
}
// start();