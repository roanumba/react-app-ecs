import { BaseMode } from "./BaseModel";
import { getType } from "./jsversion/libs";

const existingInstances = {} as any


// write a function createContext to create a model
export function createContext(init: any) {
    const buildInstance = (props:any) => {

        const names:string[] = [];
        Object.keys(props).forEach((k) => {
            names.push(k);
        });

        names.sort();
        const modelName:string = names.join("_");
        if (modelName === "") {
            throw new Error("Cannot create store view from an empty model");
        }
 
        return modelName;

    }

    const modelName = buildInstance(init);
    let instance = existingInstances[modelName];
    if (instance) {
        return instance;
    }

    const claz = class extends BaseMode {
        constructor() {
            super();
            const self = this as any;
            Object.keys(init).forEach((key:string) => {
                const type = getType(init[key]);
                self[`_${key}`] = init[key];
                if (type === 'Function' || type === 'GeneratorFunction') {
                    self[key] = (v:any) => {
                        const old = self[`_${key}`];
                        const cloneState = self.getState();
                        const newState = old(cloneState, v);
                        // assign only changed cloneState values to this
                        Object.keys(newState).forEach((k) => {
                            if (self[k] &&
                                JSON.stringify(self[k]) !== JSON.stringify(newState[k])) {
                                    self[k] = newState[k];
                            }
                        }
                        );
                    };
                    return;
                }
                Object.defineProperty(self, key, {
                    get: () => self[`_${key}`],
                    set: (value) => {
                        const old = self[`_${key}`];
                        self[`_${key}`] = value;
                        self.dispatch(key,old, value);
                    },
                });
            });
        }
    }
    instance = new claz();
    existingInstances[modelName] = instance;
    return instance;
}