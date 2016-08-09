import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    destroy(value){
      value.destroyRecord();
    },
    editSubmit(group, formValues){

      group.setProperties(formValues);
      group.save().then(() => {

      // Redirect
      this.transitionToRoute('todo-group.index');
    });
  }
}
});
