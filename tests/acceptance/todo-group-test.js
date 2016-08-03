import { test } from 'qunit';
import moduleForAcceptance from 'todo-group/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | todo group');

test('visiting /todo-groups', function(assert) {
  visit('/todo-group');

  andThen(function() {
    assert.equal(currentURL(), '/todo-group');
  });
});

test('visiting /todo-groups shows a list of tasks', function(assert){
server.createList('todo-group',5);
visit('todo-groups');
// const todo1 = server.db
// andThen

})
