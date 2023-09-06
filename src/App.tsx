import { useEffect, Suspense } from "react"
import { useRoutes, useLocation, useNavigate } from "react-router-dom"
import routes from "./router"
import './App.scss'
const BeforeRouterEnter = () => {//路由前置守卫功能
  const { pathname } = useLocation();
  const element = useRoutes(routes);
  const authorize = localStorage.getItem("token")
  if (pathname === "/login" && authorize) {//如果访问的是登录页面并且有token，跳转到首页
    return <ToHome />
  }
  if (pathname !== "/login" && !authorize) {//如果访问的不是登录页面且没token，跳转登录页
    return <ToLogin />
  }
  setDocumentTitile(element, pathname)
  return element
}
const setDocumentTitile = (element: any, pathname: string) => {
  const { route } = element.props.match;
  const routeArr = pathname.split("/");
  for (let i = 0; i < routeArr.length; i++) {
    if (routeArr[i] === "" || routeArr[i] == null || typeof (routeArr[i]) == "undefined") {
      routeArr.splice(i, 1);
      i = i - 1;

    }
  }
  if (routeArr.length <= 0) {//首页处理
    // 嵌套路由title
    if (route.children && route.children.length) {
      document.title = route.children.find((item: any) => item.index).meta.title;
    } else {
      document.title = route.meta.title
    }
  } else {
    if (route.children && route.children.length) {
      const currentRoute = filterRouteObj(route.children, routeArr[routeArr.length - 1]);
      document.title = currentRoute.meta.title
    } else {
      document.title = route.meta.title
    }
  }
}
const filterRouteObj = (arr: any, key: string) => {  // 递归过滤title
  if (!(arr instanceof Array)) return null;
  for (const i in arr) {
    const item = arr[i];
    if (item.path === key) return item;
    else {
      if (item.children) {
        const obj: object = filterRouteObj(item.children, key)
        if (obj) return obj
      }
    }
  }
}
const ToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login")
  }, [])
  return <></>
}
const ToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/")
  }, [])
  return <></>
}
const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>加载中...</div>}>
        <BeforeRouterEnter />
      </Suspense>
    </>
  )
}

export default App
