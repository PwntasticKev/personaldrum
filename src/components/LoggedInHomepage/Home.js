import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserInfo } from "../../ducks/reducer"
import "./Home.css"
import "typeface-roboto"

class Home extends Component {
  componentDidMount() {
    this.props.getUserInfo()
  }
  render() {
    // const { REACT_APP_LOGIN, REACT_APP_LOGOUT } = process.env
    // const { user, user: { img } } = this.props.user
    // const user = this.props.user
    // const profileimg = this.props.user ? <div>{this.props.user.img}</div> : <div>empty</div>
    return (
      <section>
        <section className="container">
          <div>
            <section>
              <div />
              <div className="profile-pic">
                <img src={this.props.user && this.props.user.img} alt="" />
              </div>
              <div>{this.props.user && this.props.user.username}</div>
            </section>
            <div>my tabs</div>
          </div>
          <div>
            <div>
              <button>Create Tab</button>
            </div>
            <div>list of stuff created</div>
          </div>
          <div>
            <div>trending</div>
            <div>upcoming concerts</div>
          </div>
        </section>
      </section>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUserInfo })(Home)
