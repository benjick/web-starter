import React, { Component, PropTypes } from 'react';

class LatestGists extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, error: false, gists: [] };
    this.fetchGists = this.fetchGists.bind(this);
  }

  componentDidMount() {
    this.fetchGists();
  }

  fetchGists() {
    this.setState({ loading: true });
    fetch('https://api.github.com/gists/public')
    .then(response => response.json())
    .then(json => this.setState({
      gists: json,
      loading: false,
    }))
    .catch(() => {
      this.setState({ loading: true, error: true });
    });
  }

  render() {
    return (
      <div className="gists">
        {this.state.loading ?
          <p>Loading</p> :
          <GistList gists={this.state.gists} />}
      </div>
    );
  }
}

const GistList = ({ gists }) => <ul>{gists.map(gist => <Gist key={gist.id} gist={gist} />)}</ul>;
GistList.propTypes = {
  gists: PropTypes.array.isRequired,
};

const Gist = ({ gist }) => <li><a href={gist.url}>{Object.keys(gist.files)[0]}</a></li>;
Gist.propTypes = {
  gist: PropTypes.object.isRequired,
};

export default LatestGists;
