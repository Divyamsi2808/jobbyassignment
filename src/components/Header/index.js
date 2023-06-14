import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="home-logo"
      />
      <ul className="tab-list">
        <li className="tab-item">
          <Link to="/" className="link-ele">
            Home
          </Link>
        </li>
        <li className="tab-item">
          <Link to="/jobs" className="link-ele">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
