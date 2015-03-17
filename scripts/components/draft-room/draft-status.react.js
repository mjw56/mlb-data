import React from 'react/addons';
import DraftActions from '../../actions/draft-actions';

export default React.createClass({

  _startDraft() {
    if(this.props.details.completed) return;
    DraftActions.updateDraftDetails({ id: this.props.id, details: { started: true } });
  },

  _pauseDraft() {
    DraftActions.updateDraftDetails({ id: this.props.id, details: { started: false } });
  },

  render() {
    return (
      <div>
        { this.props.details.started ?

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
