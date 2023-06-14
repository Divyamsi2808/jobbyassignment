import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    name: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  onSuccessSubmit = jwtToken => {
    this.setState({isError: false})
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitsForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: name, password}
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const data = await fetch(url, option)
    const jsonData = await data.json()
    if (data.ok) {
      this.onSuccessSubmit(jsonData.jwt_token)
    } else {
      this.setState({errorMsg: jsonData.error_msg, isError: true})
    }
  }

  onChangeUserName = event => this.setState({name: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  renderLoginForm = () => {
    const {name, password, isError, errorMsg} = this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitsForm}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-website-logo"
            />
          </div>
          <div className="input-ele-container">
            <label className="login-label-text" htmlFor="userName">
              USERNAME
            </label>
            <input
              value={name}
              id="userName"
              type="text"
              className="login-input-ele"
              placeholder="Username"
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input-ele-container">
            <label className="login-label-text" htmlFor="passwordName">
              PASSWORD
            </label>
            <input
              value={password}
              id="passwordName"
              type="password"
              className="login-input-ele"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div>{this.renderLoginForm()}</div>
  }
}

export default LoginForm
