import React from 'react/addons';
import DraftActions from '../../actions/draft-actions';

export default React.createClass({

  _startDraft() {
    DraftActions.updateDraftStatus({ id: this.props.id, started: true });
  },

  _pauseDraft() {
    DraftActions.updateDraftStatus({ id: this.props.id, started: false });
  },

  render() {
    return (
      <div>
        { this.props.started ?

          <div>
            <h3>The Draft is currently in progress</h3>
            <button onClick={this._pauseDraft}>Pause Draft</button>
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
