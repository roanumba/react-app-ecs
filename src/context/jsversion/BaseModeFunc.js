const {getType} = require('./libs');
let listeners = [];

const BaseMode =() => {
    subscribe = (watchList, listener) => {
        const watchType = getType(watchList);

        if (getType(listener)=== 'Function'  && (watchType === 'Array' || watchType === 'String')) {
            if (watchType === 'String') {
                watchList = watchList.split(',');
            }
            watchList = watchList.map((item) => item.trim());
            listeners.push({ listener, watchList });
        }
        return () => this.unsubscribe(listener);



    };

    unsubscribe = (listener) => {
        listeners = listeners.filter((l) => l.listener !== listener);
    };

    dispatch = (key,old, value) => {
        // console.log('dispatch',old,value);
        if (old === value)
            return;
        listeners.forEach((l) => {
            const { listener, watchList } = l;

            if (key && watchList.includes(key)){
            const state = {};
            watchList.forEach((key) => {
                state[key] = this[key];
            });
            listener(state);
        }
        });
    };
    getState = () => {
        const state = {};
        Object.keys(this).forEach((key) => {
            const value = this[key];
            const type = getType(value);
            if (key.startsWith('_') && type !== 'Function' && type !== 'GeneratorFunction') {
                state[key.slice(1)] = this[key];
            }
        });
        // return a deep copy of state
        return structuredClone(state);

    };

}
module.exports = BaseMode;