import React from 'react'
import {connect} from 'react-redux'
import {getAllBreakfasts} from '../reducers'
// import Breakfast from './Breakfast';

class AllBreakfasts extends React.Component {
  componentDidMount() {
    this.props.getAllBreakfasts()
  }

  render() {
    return (
      <div id="allBreakfasts">
        <h2 className="section-title">Breakfasts</h2>
        {/* <ul className="container">
          {this.props.breakfasts.map(breakfast => (
            <div className="card" key={breakfast.id}>
              <Breakfast breakfast={breakfast} />
            </div>
          ))}
        </ul> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  breakfasts: state.allBreakfasts
})

const mapDispatchToProps = dispatch => ({
  getAllBreakfasts: () => dispatch(getAllBreakfasts())
})

// export default AllBreakfasts
export default connect(mapStateToProps, mapDispatchToProps)(AllBreakfasts)
