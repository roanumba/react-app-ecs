
import { getType } from "./jsversion/libs";

//define a listener type (s: any, v: any) => any
type Listener = (s: any, v: any) => any;
//define a watchList type string[] | string
type WatchList = string[] | string;
//define a primitive type of number, string, date, boolean and array or object of its combination
type Primitive = number | string | Date | boolean ;



// explain: what does BaseMode do?
// BaseMode is a class that has 3 methods: subscribe, unsubscribe and dispatch
// subscribe: add a listener to the listeners array
// unsubscribe: remove a listener from the listeners array
// dispatch: call the listener function with the state object as the first argument and the value as the second argument
// getState: return a deep copy of the state object

let listeners: any[] = [];


export class BaseMode {
    public subscribe = (watchList:WatchList, listener:Listener) => {
        const watchType = getType(watchList);

        if (getType(listener)=== 'Function' && (watchType === 'Array' || watchType === 'String')) {
            if (watchType === 'String') {
                watchList = (watchList as string).split(',');
            }
            watchList = (watchList as string[]).map((item) => item.trim());
            listeners.push({ listener, watchList });
            console.log('subscribe',listeners);
        }
        return () => this.unsubscribe(listener);

    };

    private unsubscribe = (listener:Listener) => {
        listeners = listeners.filter((l) => l.listener !== listener);
    };

    public dispatch = (key:string,old:Primitive, value:Primitive) => {
        // console.log('dispatch',old,value);
        if (old === value)
            return;
        listeners.forEach((l:any) => {
            const self=this as any;
            const { listener, watchList } = l;

            if (key && watchList.includes(key)){
            const state = {} as any;
            (watchList as string[]).forEach((key) => {
                state[key] = self[key];
            });
            listener(state);
        }
        });
    };
    
    public getState = () => {
        const self=this as any;
        const state = {} as any;
        Object.keys(this).forEach((key:string) => {
            const value = self[key];
            const type = getType(value);
            if (key.startsWith('_') && type !== 'Function' && type !== 'GeneratorFunction') {
                state[key.slice(1)] = self[key];
            }
        });
        // return a deep copy of state
        return structuredClone(state);

    };

    //private listeners = Array<{ listener: Listener, watchList: WatchList }>();

}