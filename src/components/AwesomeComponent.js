import React, { Component } from 'react';

class AwesomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { likesCount: 0 };
    this.onLike = this.onLike.bind(this);
  }

  onLike() {
    const newLikesCount = this.state.likesCount + 1;
    this.setState({ likesCount: newLikesCount });
  }

  render() {
    return (
      <div>
        Likes: <span id="likes">{this.state.likesCount}</span>
        <button id="like" onClick={this.onLike}>Like Me</button>
      </div>
    );
  }
}

export default AwesomeComponent;
