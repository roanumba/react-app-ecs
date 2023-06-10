import { valtioWrapper } from "../../components/valtion/model/ValtioUtil";

export interface TestML {
    name: string;
    test: string;
    test2: string;
    cnt: number;
    // inc: () => void;
}

const model = {
    name: "TestML",
    test: "test ",
    test2: "test2",
    cnt: 0,

    inc :(s:any)=> {
        s.cnt=s.cnt+1;
        s.tt="hello world";
        return s;
    }

}

// const testModel= createContext(model);
// export {testModel}



const prx = valtioWrapper(model);
export const testModel = prx;