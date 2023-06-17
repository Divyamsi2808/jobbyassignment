import './index.css'

const ProfileContainer = props => {
  const {
    profileObj,
    profileStatus,
    getProfileInfo,
    renderLoader,
    profileFetchingConstants,
  } = props
  const {name, profileImageUrl, shortBio} = profileObj
  const onClickProfileRetry = () => {
    getProfileInfo()
  }

  const profileFailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        className="profile-failure-btn"
        onClick={onClickProfileRetry}
      >
        Retry
      </button>
    </div>
  )

  const profileSuccessView = () => (
    <div className="profile-container">
      <img src={profileImageUrl} alt="profile" className="profile-image" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )

  switch (profileStatus) {
    case profileFetchingConstants.success:
      return profileSuccessView()
    case profileFetchingConstants.failure:
      return profileFailureView()
    case profileFetchingConstants.isLoading:
      return <div className="profile-loader">{renderLoader()}</div>
    default:
      return null
  }
}

export default ProfileContainer
