import { createContext } from "../StateMangement";


const model= {
    navigator: {path: '#',state:{}},
    navigateTo: (s:any, v:any) => {
        s.navigator= {path: v.path, state: v.state};
        return s;
    }
}
const globalState = createContext(model);
export {globalState}