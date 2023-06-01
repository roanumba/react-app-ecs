
import React, { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

class TestModel {
    get test() {
        return this._test;
    }
    set test(value) {
        const old = this._test;
        this._test = value;
        this.dispatch(old,value);
    }
    get cnt() {
        return this._cnt;
    }

    set cnt(value) {
        const old = this._cnt;
        this._cnt = value;
        this.dispatch(old,value);
    }

    subscribe=(listener:(st:any)=>void) =>{
        const fn=listener.toString().replace(/\s/g,'');
        const lstns=this.listeners.find((l:any)=>l.toString().replace(/\s/g,'')===fn);
        if (lstns) return;
        this.listeners.push(listener);
    }
    unsubscribe=()=> {
        // this.listeners=[];
    }

    dispatch=(old:any,value:any)=> {
        console.log('dispatch',old,value);
       if (old===value) return;
        this.listeners.forEach((listener:any) => {
            if (typeof listener !== 'function') return;
            listener(this);
        });
    }

    private _test: string = 'test';
    private _cnt: number = 10;
    private listeners: any[] = [];

};

function useTestModel() {
    const ctx = useContext(GlobalContext);
    if (ctx.testModel) return ctx;
    ctx.testModel = new TestModel();
    return ctx;

}


export { useTestModel}

