import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import ProfileCotainer from '../ProfileCotainer'
import Header from '../Header'
import JobCard from '../JobCardItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsListFetchingConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

const profileFetchingConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class Jobs extends Component {
  state = {
    profile: {},
    jobsList: [],
    profileStatus: profileFetchingConstants.initial,
    jobsStatus: jobsListFetchingConstants.initial,
    searchValue: '',
    employmentList: [],
    minimumSalary: '',
  }

  componentDidMount = () => {
    this.getProfileInfo()
    this.getJobsList()
  }

  onChangeSearchValue = event =>
    this.setState({searchValue: event.target.value})

  onChangeTypeOfEmployment = event => {
    const {employmentList} = this.state
    const employmentType = event.target.value
    if (employmentList.includes(employmentType)) {
      this.setState(
        prevState => ({
          employmentList: prevState.employmentList.filter(
            eachValue => eachValue !== employmentType,
          ),
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          employmentList: [employmentType, ...prevState.employmentList],
        }),
        this.getJobsList,
      )
    }
  }

  onChangeSalaryRange = event =>
    this.setState({minimumSalary: event.target.value}, this.getJobsList)

  getJobsList = async () => {
    this.setState({jobsStatus: jobsListFetchingConstants.isLoading})
    const {searchValue, employmentList, minimumSalary} = this.state
    const url = `https://apis.ccbp.in/jobs?search=${searchValue}&employment_type=${employmentList.join()}&minimum_package=${minimumSalary}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const data = await fetch(url, options)
    if (data.ok) {
      const jsonData = await data.json()
      const modifiesJobsList = jsonData.jobs.map(eachObj => ({
        companyLogoUrl: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        id: eachObj.id,
        jobDescription: eachObj.job_description,
        location: eachObj.location,
        packagePerAnnum: eachObj.package_per_annum,
        rating: eachObj.rating,
        title: eachObj.title,
      }))
      this.setState({
        jobsList: [...modifiesJobsList],
        jobsStatus: jobsListFetchingConstants.success,
      })
    } else {
      this.setState({jobsStatus: jobsListFetchingConstants.failure})
    }
  }

  getProfileInfo = async () => {
    this.setState({profileStatus: profileFetchingConstants.isLoading})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const data = await fetch(url, options)

    if (data.ok) {
      const jsonData = await data.json()
      const profileObj = jsonData.profile_details
      const modifiedData = {
        profileImageUrl: profileObj.profile_image_url,
        name: profileObj.name,
        shortBio: profileObj.short_bio,
      }
      this.setState({
        profile: {...modifiedData},
        profileStatus: profileFetchingConstants.success,
      })
    } else {
      this.setState({profileStatus: profileFetchingConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-view-heading">No Jobs Found</h1>
          <p className="no-jobs-view-para">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachObj => (
          <JobCard key={eachObj.id} jobObj={eachObj} />
        ))}
      </ul>
    )
  }

  renderJobsListFailureView = () => (
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
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobsViews = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case jobsListFetchingConstants.success:
        return this.renderJobList()
      case jobsListFetchingConstants.failure:
        return this.renderJobsListFailureView()
      case jobsListFetchingConstants.isLoading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobsSection = () => {
    const {searchValue} = this.state
    return (
      <div className="jobs-section-view-container">
        <div className="search-larger-container">
          <input
            className="search-input-ele"
            type="search"
            onChange={this.onChangeSearchValue}
            value={searchValue}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.getJobsList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderAllJobsViews()}
      </div>
    )
  }

  renderProfileView = () => {
    const {profile, profileStatus} = this.state
    return (
      <ProfileCotainer
        profileObj={profile}
        profileStatus={profileStatus}
        getProfileInfo={this.getProfileInfo}
        renderLoader={this.renderLoader}
        profileFetchingConstants={profileFetchingConstants}
      />
    )
  }

  renderTypeOfEmploymentFilters = () => (
    <div className="employment-type-container">
      <hr />
      <h1>Type of Employment</h1>
      <ul className="employment-type-list">
        {employmentTypesList.map(eachObj => (
          <li className="employment-item" key={eachObj.employmentTypeId}>
            <input
              className="check-box"
              id={eachObj.employmentTypeId}
              type="checkbox"
              value={eachObj.employmentTypeId}
              onChange={this.onChangeTypeOfEmployment}
            />
            <label className="label-text" htmlFor={eachObj.employmentTypeId}>
              {eachObj.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRangesFilters = () => (
    <div className="employment-type-container">
      <hr />
      <h1>Salary Range</h1>
      <ul className="employment-type-list">
        {salaryRangesList.map(eachObj => (
          <li className="employment-item" key={eachObj.salaryRangeId}>
            <input
              className="check-box"
              id={eachObj.salaryRangeId}
              type="radio"
              name="SalaryRange"
              value={eachObj.salaryRangeId}
              onChange={this.onChangeSalaryRange}
            />
            <label className="label-text" htmlFor={eachObj.salaryRangeId}>
              {eachObj.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderFilterSection = () => {
    const {searchValue} = this.state

    return (
      <div className="filter-section">
        <div className="search-smaller-container">
          <input
            className="search-input-ele"
            type="search"
            onChange={this.onChangeSearchValue}
            value={searchValue}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.getJobsList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="profile-item">{this.renderProfileView()}</div>
        {this.renderTypeOfEmploymentFilters()}
        {this.renderSalaryRangesFilters()}
      </div>
    )
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-content-container">
          {this.renderFilterSection()}
          {this.renderJobsSection()}
        </div>
      </div>
    )
  }
}

export default Jobs
