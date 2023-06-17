import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarItemCard = props => {
  const {similarItemObj} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = similarItemObj
  return (
    <li className="similar-item-container">
      <div className="similar-item-company-info">
        <img
          src={companyLogoUrl}
          className="similar-item-company-logo"
          alt="similar job company logo"
        />
        <div className="similar-item-title-info-container">
          <h1 className="similar-item-title">{title}</h1>
          <div className="similar-item-rating-container">
            <FaStar className="similar-item-ratings-icon " />
            <p className="similar-item-ratings">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>Description</h1>
        <p className="similar-item-description">{jobDescription}</p>
      </div>
      <div className="similar-item-location-employmentType-container">
        <div className="similar-item-location-container">
          <MdLocationOn className="similar-item-icon" />
          <p>{location}</p>
        </div>
        <div className="similar-item-employmentType-container">
          <BsBriefcaseFill className="similar-item-icon" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarItemCard
