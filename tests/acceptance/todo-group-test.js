import { test } from 'qunit';
import moduleForAcceptance from 'todo-group/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | todo group index');

test('user can see list of todo categories when visiting /todo-groups', function(assert) {
  server.createList('todo-group', 5);
  visit('/todo-groups');

  andThen(function() {
    assert.equal(currentURL(), '/todo-groups');
    assert.equal(currentRouteName(), 'todo-group.index');

    assert.equal(findWithAssert('.page-title').text().trim(),
      'Categories',
      'There is an element with a class "page-title" that says "Categories"');
    assert.equal(findWithAssert('.collection__item').length, 5,
      'There should be a "collection__item" for each "todo-group" record in the API.' +
      'To do this you should load the models from Ember Data into your template');

    const firstGroup = server.db.todoGroups.find(1);
    assert.equal(findWithAssert('.todo-group__title:first').text().trim(), firstGroup.title,
      'For each "todo-group" pulled from the API, there should be an element with the class' +
      '"todo-group__title" filled with the title of the looped over todo.' +
      '(Note: this only tests the title of the first group, but should give the same result)');
  });
});

test('user can navigate to the new form from /todo-groups', function(assert) {
  visit('/todo-groups');
  click('.new-btn');

  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.new',
      'Clicking on an element with the class "new-btn" should redirect to the route "todo-group.new"');
    assert.equal(currentURL(), '/todo-groups/new',
      'Clicking on an element with the class "new-btn" should redirect to the URL "/todo-groups/new"');
  });
});

test('user can navigate to the new form from /todo-groups', function(assert) {
  visit('/todo-groups');
  click('.new-btn');

  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.new',
      'Clicking on an element with the class "new-btn" should redirect to the route "todo-group.new"');
    assert.equal(currentURL(), '/todo-groups/new',
      'Clicking on an element with the class "new-btn" should redirect to the URL "/todo-groups/new"');
  });
});

test('user can navigate to the edit form from /todo-groups', function(assert) {
  server.createList('todo-group', 4);
  visit('/todo-groups');
  // Clicks the third element (position 2) with a classs ".edit-btn"
  click('.edit-btn:eq(2)');


  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.edit',
      'Clicking on the third element with the class "edit-btn" should redirect to the route "todo-group.edit"');
    assert.equal(currentURL(), '/todo-groups/3/edit',
      'Clicking on the third element with the class "edit-btn" should redirect to the URL "/todo-groups/3/edit"');
  });
})

test('user can delete todo-groups when visiting /todo-groups', function(assert) {
  server.createList('todo-group', 3);
  visit('/todo-groups');
  // Clicks the second element (position 1) with a classs ".delete-btn"
  click('.delete-btn:eq(1)');


  andThen(function() {
    assert.equal(findWithAssert('.collection__item').length, 2,
      'There should be one fewer "collection__item" since the todo-group should be deleted' +
      'after clicking the second ".delete-btn"');
    assert.equal(server.db.todoGroups.length, 2,
      'The deleted item should also be deleted in the API!');

    assert.equal(currentURL(), '/todo-groups',
      'The url should not change after deleting a category.');
  });
});
