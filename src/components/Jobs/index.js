import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  renderFilterSection = () => {
    const {employmentTypesList, salaryRangesList} = this.props
    console.log(this.props)
    console.log(employmentTypesList, salaryRangesList)
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderFilterSection()}
      </div>
    )
  }
}

export default Jobs
