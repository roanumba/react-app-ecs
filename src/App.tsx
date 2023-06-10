import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import { routes } from "./components/pages/Paths";







interface Props {
}

const App = (props: Props) => {

  const router = createBrowserRouter(routes);
  

  return <RouterProvider
    router={router}
    fallbackElement={<div>loading...</div>}
  />;
};

export default App;
