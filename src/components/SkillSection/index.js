import './index.css'

const SkillSection = props => {
  const {skillsObj} = props
  const newSkillsObj = skillsObj === undefined ? [] : [...skillsObj]

  const renderSkillItem = eachObj => (
    <li className="skill-item" key={eachObj.name}>
      <img src={eachObj.image_url} alt={eachObj.name} className="skill-image" />
      <p className="skill-name">{eachObj.name}</p>
    </li>
  )

  return (
    <div className="skill-container">
      <h1>Skills</h1>
      <ul className="skill-items-container">
        {newSkillsObj.map(eachObj => renderSkillItem(eachObj))}
      </ul>
    </div>
  )
}

export default SkillSection
