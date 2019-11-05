import React from 'react'
import {connect} from 'react-redux'
import {getAllBreakfasts} from '../store'
import {Breakfast} from './breakfast'
// import Breakfast from './Breakfast';

class AllBreakfasts extends React.Component {
  componentDidMount() {
    this.props.getAllBreakfastsThunk()
    console.log('Breakfasts: ', this.props)
  }

  render() {
    console.log('breakfasts? ', this.props.breakfasts)
    return (
      <div id="allBreakfasts">
        <h2 className="section-title">Breakfasts</h2>
        <ul className="container">
          {this.props.breakfasts
            ? this.props.breakfasts.map(breakfast => (
                <div className="card" key={breakfast.id}>
                  <li>
                    <Breakfast breakfast={breakfast} />
                  </li>
                </div>
              ))
            : 'no breakfast'}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  breakfasts: state.breakfast.allBreakfasts
})

const mapDispatchToProps = dispatch => ({
  getAllBreakfastsThunk: () => dispatch(getAllBreakfasts())
})

// export default AllBreakfasts
export default connect(mapStateToProps, mapDispatchToProps)(AllBreakfasts)
