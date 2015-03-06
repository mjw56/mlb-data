import React from 'react/addons';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { timer: 120 }
  },

  componentDidMount() {

  },

  render() {

    return (
      
    );
  }

});
