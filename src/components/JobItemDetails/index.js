import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {BiLinkExternal} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SkillSection from '../SkillSection'
import SimilarItemCard from '../SimilarItemCard'
import './index.css'

const jobsDetailsFetchingConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class JobDetails extends Component {
  state = {
    jobsDetailsStatus: jobsDetailsFetchingConstants.initial,
    jobDetailsObject: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    this.setState({jobsDetailsStatus: jobsDetailsFetchingConstants.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const data = await fetch(url, options)

    if (data.ok) {
      const jsonData = await data.json()
      const jobDetails = jsonData.job_details
      const similarJobs = jsonData.similar_jobs
      const modifiedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        lifeAtCompany: jobDetails.life_at_company,
        companyWebsiteUrl: jobDetails.company_website_url,
        skills: jobDetails.skills,
      }

      const modifiedSimilarJobsList = similarJobs.map(eachObj => ({
        companyLogoUrl: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        id: eachObj.id,
        jobDescription: eachObj.job_description,
        location: eachObj.location,
        rating: eachObj.rating,
        title: eachObj.title,
      }))
      this.setState({
        jobsDetailsStatus: jobsDetailsFetchingConstants.success,
        jobDetailsObject: {...modifiedJobDetails},
        similarJobs: [...modifiedSimilarJobsList],
      })
    } else {
      this.setState({jobsDetailsStatus: jobsDetailsFetchingConstants.failure})
    }
  }

  renderJobDetailsContainer = () => {
    const {jobDetailsObject} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      lifeAtCompany,
      location,
      skills,
      companyWebsiteUrl,
      title,
      rating,
    } = jobDetailsObject
    const newLifeAtCompany =
      lifeAtCompany === undefined ? {} : {...lifeAtCompany}

    return (
      <div className="job-details-container">
        <div className="job-details-container">
          <div className="job-details-company-info">
            <img
              src={companyLogoUrl}
              className="job-details-company-logo"
              alt="job details company logo"
            />
            <div className="job-details-title-info-container">
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-rating-container">
                <FaStar className="job-details-rating-icon" />
                <p className="job-details-ratings">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-info">
            <div className="job-details-location-employmentType-container">
              <div className="job-details-location-container">
                <MdLocationOn className="job-details-icon" />
                <p>{location}</p>
              </div>
              <div className="job-details-employmentType-container">
                <BsBriefcaseFill className="job-details-icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="job-details-package-text">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div>
            <div className="job-details-visit-link-container">
              <h1>Description</h1>
              <a href={companyWebsiteUrl} className="visit-link-text">
                Visit <BiLinkExternal className="visit-icon" />
              </a>
            </div>
            <p className="job-details-description">{jobDescription}</p>
          </div>
          <SkillSection skillsObj={skills} />
          <div className="life-at-company-container">
            <h1>Life At Company</h1>
            <div className="life-at-company-container-content">
              <p className="life-at-company-para">
                {newLifeAtCompany.description}
              </p>
              <img
                src={newLifeAtCompany.image_url}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-Jobs-container">
        <h1>Similar Jobs</h1>
        <ul className="similar-items-list">
          {similarJobs.map(eachObj => (
            <SimilarItemCard key={eachObj.id} similarItemObj={eachObj} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="failure-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-jobs-image"
      />
      <h1 className="failure-jobs-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-jobs-view-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-jobs-view-btn"
        type="button"
        onClick={this.fetchJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsSuccessView = () => (
    <>
      {this.renderJobDetailsContainer()}
      {this.renderSimilarJobs()}
    </>
  )

  renderAllJobDetailsView = () => {
    const {jobsDetailsStatus} = this.state
    switch (jobsDetailsStatus) {
      case jobsDetailsFetchingConstants.success:
        return this.renderJobDetailsSuccessView()
      case jobsDetailsFetchingConstants.failure:
        return this.renderJobDetailsFailureView()
      case jobsDetailsFetchingConstants.isLoading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-background-container">
        <Header />
        <div className="job-details-content-container">
          {this.renderAllJobDetailsView()}
        </div>
      </div>
    )
  }
}

export default JobDetails
