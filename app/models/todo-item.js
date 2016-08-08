
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  done: DS.attr('boolean'),
  title: DS.attr('string'),
  group: DS.belongsTo('todo-group'),
});
