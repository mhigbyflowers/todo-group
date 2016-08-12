import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    destroy(value){
      value.destroyRecord();
    },

    saveItem(value,formValues,reset){
    const storeItem =  this.store.createRecord('todo-item', formValues);
    storeItem.set('group',value);
    storeItem.save();
    reset();
    },
toggleCheck(item){
  item.toggleProperty('done');
  item.save();

}
}
});
