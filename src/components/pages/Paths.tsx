import { NonIndexRouteObject, RouteObject } from "react-router-dom";
import { NotFound } from ".";
import { About } from "./About";
import { Home } from "./Home";
import { Layout } from "../layout/Layout";
import { ValtioTodo } from "../valtio/todo/ValtioTodo";

export interface ExtendedRouteObject extends NonIndexRouteObject {
  leftBar?: React.ReactNode;
  rightBar?: React.ReactNode;
  children?: ExtendedRouteObject[];
}

const routes = [
  {
    path: '/', Component: Layout,
    children: [
      {
        path: '/home', Component: Home,
        children: [
          {
            path: 'one/', Component: (e, s) => {
              // console.log(e, s);
              return <div>Home child 1</div>
            }
          },
          { path: 'two/', element: <ValtioTodo/> }
        ]
      },
      { path: '/about', Component: About, leftBar: <div>left bar</div> },
      { path: '*', Component: NotFound },
    ]
  },

] as ExtendedRouteObject[];

export { routes }