import React from 'react/addons';

let refreshIntervalId = undefined;

export default React.createClass({

  getInitialState() {
    return { time: '', running: false }
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.details.started && !this.state.running) {

      this._startTimer();
      this.setState({ running: true });

    } else if(nextProps.details.started && this.state.running) {

      clearInterval(refreshIntervalId);
      this.setState({ running: false, time: '' });

    } else if(this.state.running) {

      this.props.nextPick();
      clearInterval(refreshIntervalId);
      this.setState({ running: false, time: '' });

    }
  },

  _startTimer() {
      let totalSeconds = 10,
          mins, seconds;

      refreshIntervalId = setInterval(() => {
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
