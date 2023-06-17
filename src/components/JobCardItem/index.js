import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobObj} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    id,
    location,
    title,
    rating,
  } = jobObj

  return (
    <Link className="link-ele" to={`/jobs/${id}`}>
      <li className="card-container">
        <div className="card-company-info">
          <img
            src={companyLogoUrl}
            className="card-company-logo"
            alt="company logo"
          />
          <div className="card-title-info-container">
            <h1 className="card-title">{title}</h1>
            <div className="card-rating-container">
              <FaStar className="rating-icon" />
              <p className="job-ratings">{rating}</p>
            </div>
          </div>
        </div>
        <div className="card-job-info">
          <div className="card-location-employmentType-container">
            <div className="card-location-container">
              <MdLocationOn className="card-icon" />
              <p>{location}</p>
            </div>
            <div className="card-employmentType-container">
              <BsBriefcaseFill className="card-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="card-package-text">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
