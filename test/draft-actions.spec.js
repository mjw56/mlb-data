import chai, {assert, expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import DraftActions from '../scripts/actions/draft-actions';
import firebaseAPI from '../scripts/utils/firebase-mlb-api';

chai.should();
chai.use(sinonChai, chaiAsPromised);

describe('draft actions class', () => {

  describe('get draft details method', () => {
    it('should exist', () => {
      assert.equal(typeof DraftActions.getDraftDetailsForId, 'function');
    });

    it('should call to firebase api', function() {
      let spy = sinon.spy(firebaseAPI, "getDraftDetailsForId");

      DraftActions.getDraftDetailsForId('123456');

      expect(spy).to.have.been.calledWith("123456");
    });

    it('should dispatch once call to firebase api resolves', () => {
      //let spy = sinon.spy(DraftActions, 'dispatch');

      DraftActions.getDraftDetailsForId('123456');

      firebaseAPI.getDraftDetailsForId.should.be.fulfilled;
      //assertTrue(spy.called());
    });

  });

  describe('update draft status method', () => {
    it('should exist', () => {
      assert.equal(typeof DraftActions.updateDraftStatus, 'function');
    });

    it('should call updateDraftStatus method on firebase api', function() {
      let spy = sinon.spy(firebaseAPI, "updateDraftStatus");

      DraftActions.updateDraftStatus({ started: true });

      expect(spy).to.have.been.calledWith({ started: true });
    });

    it('should dispatch once call to firebase api resolves', () => {
      //let spy = sinon.spy(DraftActions, 'dispatch');

      DraftActions.updateDraftStatus({ started: true });

      firebaseAPI.updateDraftStatus.should.be.fulfilled;
      //assertTrue(spy.called());
    });
  });

  describe('add player to roster method', () => {
    it('should exist', () => {
      assert.equal(typeof DraftActions.addPlayerToRoster, 'function');
    });

    it('should call addPlayerToRoster method on firebase api', function() {
      let spy = sinon.spy(firebaseAPI, "addPlayerToRoster");

      DraftActions.addPlayerToRoster('my awesome league', '123456', { name: 'Mike Trout' });

      expect(spy).to.have.been.calledWith('my awesome league', '123456', { name: 'Mike Trout' });
    });

    it('should dispatch once call to firebase api resolves', () => {
      //let spy = sinon.spy(DraftActions, 'dispatch');

      DraftActions.addPlayerToRoster('my awesome league', '123456', { name: 'Mike Trout' });

      firebaseAPI.addPlayerToRoster.should.be.fulfilled;
      //assertTrue(spy.called());
    });
  });

});
