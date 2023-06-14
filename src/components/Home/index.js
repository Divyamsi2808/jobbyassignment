import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content-container">
          <h1 className="home-heading-ele">
            Find The Job That Fit For Your Life
          </h1>
          <p className="home-para-ele">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits for abilities and potential.
          </p>
          <button type="button" className="home-btn">
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
