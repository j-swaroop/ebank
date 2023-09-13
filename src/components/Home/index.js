import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/ebank/login')
  }

  return (
    <div className="home-bg-container">
      <div className="responsive-home-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <button onClick={onClickLogout} type="button" className="logout-btn">
            {' '}
            Logout{' '}
          </button>
        </nav>
        <div className="content-home-container">
          <h1 className="home-heading"> Your Flexibility, Our Excellence </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
