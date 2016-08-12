import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveTodo(formValues) {
      // Look up what's in the form?
      // Create and Save an Author
      this.store.createRecord('todo-group', formValues)
        .save().then(() => {

        // Redirect
        this.transitionToRoute('todo-group.index');
      });

    },
  },
});
