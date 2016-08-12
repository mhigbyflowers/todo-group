import { test } from 'qunit';
import moduleForAcceptance from 'todo-group/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | todo group/edit');

test('visiting /todo-groups/1/edit shows a for to edit a todo-group with id 1', function(assert) {
  const group = server.create('todo-group');
  visit('/todo-groups/1/edit');

  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.edit',
      'The url /todo-groups/1/edit loads the "todo-group.edit" route.');
    assert.equal(currentURL(), '/todo-groups/1/edit',
      'The "todo-group.edit" route does not redirect without user interaction');
      assert.equal(findWithAssert('.page-title').text().trim(),
        `Editing ${group.title}`,
        'There is an element with a class "page-title" that says "Editing "' +
        ' then the current group title.' +
        'Current title is: ' + group.title);
  });
});

test('visiting /todo-groups/1/edit shows an edit todo-group form that' +
  ' is filled in with the existing todo-group being edited', function(assert) {
  const group = server.create('todo-group');
  visit('/todo-groups/1/edit');

  andThen(function() {
    assert.equal(findWithAssert('.title-input').val(), group.title,
      'The title input should be filled in with the existing todo-group title.' +
      'Look at the docs for ember-simple-form, but instead of the hash helper use model');
  });
});

test('user can submit the form on /todo-groups/1/edit to update todo-group with id 1', function(assert) {
  server.create('todo-group');
  visit('/todo-groups/1/edit');
  fillIn('input.title-input', 'Music');
  click('.submit');

  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.index',
      'After submit redirect to the "todo-group.index" route.');
    assert.equal(currentURL(), '/todo-groups', 'After submit redirect to /todo-groups');

    assert.equal(findWithAssert('.collection__item').length, 1,
      'There should be a "collection__item" for the new saved "todo-group" record in the API.');

    const firstGroup = server.db.todoGroups.find(1);
    assert.equal(firstGroup.title, 'Music',
      'The filled in title should be saved to the new todo-group on the API');
    assert.equal(findWithAssert('.todo-group__title:first').text().trim(), firstGroup.title,
      'For each "todo-group" pulled from the API, there should be an element with the class' +
      '"todo-group__title" filled with the title of the looped over todo.');
  });
});
