import Ember from 'ember';
export default Ember.Controller.extend({
  actions: {
    destroy(value){
      value.destroyRecord();
    }
  }
});
