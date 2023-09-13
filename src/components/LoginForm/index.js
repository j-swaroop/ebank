import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    const userDetails = {
      user_id: userId,
      pin,
    }

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  render() {
    const {showError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <div className="content-container">
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
                alt="website login"
                className="login-img"
              />
            </div>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <h1 className="heading"> Welcome Back!</h1>
              <div className="input-container">
                <label className="label" htmlFor="input">
                  {' '}
                  User ID
                </label>
                <input
                  placeholder="Enter User ID"
                  onChange={this.onChangeUserId}
                  type="text"
                  className="input"
                  id="input"
                />
              </div>

              <div className="input-container">
                <label className="label" htmlFor="pin">
                  {' '}
                  PIN
                </label>
                <input
                  placeholder="Enter PIN"
                  onChange={this.onChangePin}
                  type="password"
                  className="input"
                  id="pin"
                />
              </div>

              <button type="submit" className="login-btn">
                {' '}
                Login
              </button>
              {showError && <p className="error-msg"> *{errorMsg} </p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
