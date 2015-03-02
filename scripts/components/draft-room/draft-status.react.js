import React from 'react/addons';
import Router from 'react-router';
import DraftActions from '../../actions/draft-actions';
import DraftStore from '../../stores/draft-store';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [Router.State, PureRenderMixin],

  getInitialState() {
    return { status: {} };
  },

  componentDidMount() {
    DraftStore.addDraftStatusListener(this._updateDraftStatus);
    DraftActions.getDraftStatusForID(this.props.id);
  },

  _startDraft() {
    DraftActions.updateDraftStatus({ id: this.props.id, started: true });
  },

  _updateDraftStatus() {
    this.setState({ status: DraftStore.getDraftStatus() });
  },

  render() {
    return (
      <div>
        { this.state.status.started ?

          <div>
            <h3>The Draft is currently in progress</h3>
            <button onClick={this.pauseDraft}>Pause Draft</button>
          </div>
          :
          <div>
            <h3>The Draft has not yet started</h3>
            <button onClick={this._startDraft}>Start Draft</button>
          </div>
        }
      </div>
    );
  }

});
