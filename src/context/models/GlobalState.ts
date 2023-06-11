import { valtioWrapper } from "../valtio/ValtioUtil";



const model = {
    navigator: { path: '#', state: {} },
    busy:false,
    setBusy:(s:any,v:boolean)=>{
        s.busy=v;
        return s;
    }

}
// const globalState = createContext(model);
const globalState = valtioWrapper(model);

export { globalState }