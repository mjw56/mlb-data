import React from 'react/addons';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { time: '' }
  },

  componentWillReceiveProps() {
    this._startTimer();
  },

  _startTimer() {
      let totalSeconds = 10,
          mins, seconds;

      let refreshIntervalId = setInterval(() => {
          mins = parseInt(totalSeconds / 60)
          seconds = parseInt(totalSeconds % 60);
          seconds = seconds < 10 ? "0" + seconds : seconds;

          if (totalSeconds === 0) {
              clearInterval(refreshIntervalId);
              this.props.nextPick();
          }

          this.setState({ time: mins + ":" + seconds });
          totalSeconds--;

      }, 1000);
  },

  render() {

    return (
      <h3>Time: {this.state.time}</h3>
    );
  }

});
