import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('todo-group', {path:'/todo-groups'}, function() {
    this.route('new');
    this.route('edit', {path:'/:id/edit'});

  });
});

export default Router;
