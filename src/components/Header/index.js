import {Link, withRouter} from 'react-router-dom'
import {ImExit} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiTwotoneHome} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const headerForLargeSection = () => (
    <div className="header-large-container">
      <Link to="/" className="link-ele">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="home-logo"
        />
      </Link>
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

  const headerForSmallerSection = () => (
    <div className="header-smaller-container">
      <Link to="/" className="link-ele">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="home-logo"
        />
      </Link>
      <ul className="tab-list">
        <li className="tab-item">
          <Link to="/" className="link-ele">
            <AiTwotoneHome className="header-icon" />
          </Link>
        </li>
        <li className="tab-item">
          <Link to="/jobs" className="link-ele">
            <BsBriefcaseFill className="header-icon" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-smaller-btn"
            onClick={onClickLogout}
          >
            <ImExit className="header-icon" />
          </button>
        </li>
      </ul>
    </div>
  )
  return (
    <>
      {headerForSmallerSection()}
      {headerForLargeSection()}
    </>
  )
}

export default withRouter(Header)
