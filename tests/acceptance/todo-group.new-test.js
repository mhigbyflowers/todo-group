import { test } from 'qunit';
import moduleForAcceptance from 'todo-group/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | todo group/new');

test('visiting /todo-groups/new shows a new todo-group form', function(assert) {
  visit('/todo-groups/new');

  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.new',
      'The url /todo-groups/new loads the "todo-group.new" route.');
    assert.equal(currentURL(), '/todo-groups/new',
      'The "todo-group.new" route does not redirect without user interaction');
      assert.equal(findWithAssert('.page-title').text().trim(),
        'New Category',
        'There is an element with a class "page-title" that says "New Category"');
  });
});

test('visiting /todo-groups/new shows a new todo-group form that can be filled in', function(assert) {
  visit('/todo-groups/new');
  fillIn('input.title-input', 'Gym Day');

  andThen(function() {
    assert.equal(findWithAssert('.title-input').val(), 'Gym Day',
      'Check that there is nothing changing the value of our input. (This should not fail if you have an input)');
  });
});

test('user can submit the form on /todo-groups/new to create a new todo-group', function(assert) {
  visit('/todo-groups/new');
  fillIn('input.title-input', 'Food');
  click('.submit');

  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.index', 'After submit redirect to the "todo-group.index" route.');
    assert.equal(currentURL(), '/todo-groups', 'After submit redirect to /todo-groups');

    assert.equal(findWithAssert('.collection__item').length, 1,
      'There should be a "collection__item" for the new saved "todo-group" record in the API.');

    const firstGroup = server.db.todoGroups.find(1);
    assert.equal(firstGroup.title, 'Food',
      'The filled in title should be saved to the new todo-group on the API');
    assert.equal(findWithAssert('.todo-group__title:first').text().trim(), firstGroup.title,
      'For each "todo-group" pulled from the API, there should be an element with the class' +
      '"todo-group__title" filled with the title of the looped over todo.');
  });
});
