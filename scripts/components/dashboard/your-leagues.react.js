import React from 'react/addons';

export default React.createClass({

  render() {

    let leagues = (this.props.league.info || []).map((league) => {
      return <h5 key={league}>{league}</h5>;
    });

    return (
      <div>
        { this.props.league.inLeague ?
          <h4>Your Leagues: {leagues}</h4>:
          <h4>You are not currently in any leagues</h4>
        }
      </div>
    );
  }

});
