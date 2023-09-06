import { useNavigate } from "react-router-dom"
import { Button } from "antd"
const Login: React.FC = () => {
  const navigate = useNavigate()
  const clickLogin = () => {
    localStorage.setItem("token", "penglin")
    navigate("/home")
  }
  return (
    <div>
      <Button onClick={clickLogin}>点击登录</Button>
    </div>
  )
}
export default Login