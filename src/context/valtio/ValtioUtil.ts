import { proxy, subscribe } from "valtio";
import { globalRouteState } from "../../App";


const getType = (variable:any) => {
    return Object.prototype.toString.call(variable).slice(8, -1);
};

const getState = (model:any) => {
    const state:any = {};
    Object.keys(model).forEach((key) => {
        const value = model[key];
        const type = getType(value);
        if (type !== 'Function' && type !== 'GeneratorFunction') {
            state[key] = model[key];
        }
    });
 
    return state;

};

export const valtioBuildReducers = (model:any, proxy:any) => {
    
    Object.keys(model).forEach((key) => {
        const type = getType(model[key]);
        if (type === 'Function' || type === 'GeneratorFunction') {
            proxy[key] = (v:any) => {
                const method = model[key];
                const oldState = getState(proxy);
                const newState = method(oldState, v);

                // assign only changed oldState values to this
                const keys = Object.keys(newState);
                keys.forEach((k) => {
                    let pxValue = proxy[k];
                    if (pxValue!==undefined &&
                        JSON.stringify(proxy[k]) !== JSON.stringify(newState[k])) {
                            proxy[k] = newState[k];
                    }
                }
                );
            };
            
        }
    });
    
}

export const valtioWrapper = (model: any) => {

    const valtioSubscribe = (watchList: any, listener: any=null) => {
        if (getType(watchList) === 'Function' && listener === null) {
            listener = watchList;
            watchList = Object.keys(model).filter((key) => {
                const type = getType(model[key]);
                return type !== 'Function' && type !== 'GeneratorFunction';
            });
        }
        
        const watchType = getType(watchList);
        const listenerType = getType(listener);

        if (listenerType === 'Function' && (watchType === 'Array' || watchType === 'String')) {

            const unsub = subscribe(proxyModel, () => {
                let wList:string[]=[]
                if (watchType === 'String') {
                    wList = (watchList as string).split(',');
                }else{
                    wList=watchList as string[];
                }
                if ( wList.length > 0) {
                    const state = {} as any;
                    wList.forEach((key) => {
                        state[key] = (proxyModel as any)[key];
                    });
                    listener(state);
                }
            });
            return unsub;
        }
        return () => { };
    }
    

    model.routeTo=(s:any, v:any)=>{
        const opt={path:'',state:{}}
        if (typeof (v) === 'string') {
            opt['path'] = v;
            opt['state'] = {};
        }else{  
            opt['path'] = v.path;
            opt['state'] = v.state;
        }
        if (globalRouteState && globalRouteState.routeTo){
            globalRouteState.routeTo(opt);
        }
        return s;
    }
    


    const proxyModel = proxy({ ...model, subscribe: valtioSubscribe});
    valtioBuildReducers(model, proxyModel);

    return proxyModel;
}

