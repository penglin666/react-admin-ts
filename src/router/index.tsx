import Home from "@/views/home";
import About from "@/views/about";
import Layout from "@/layout";
import Login from "@/views/login";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        meta: {
          title: "首页"
        },
        children:[
          {
            index: true,
            element: <Home />,
            meta: {
              title: "首页"
            },
          }
        ]
      },
      {
        path: "about",
        element: <About />,
        meta: {
          title: "关于"
        }
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录页"
    }
  }

]
export default routes