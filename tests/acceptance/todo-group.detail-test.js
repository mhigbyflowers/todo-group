import { test } from 'qunit';
import moduleForAcceptance from 'todo-group/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | todo group/detail');

test('visiting /todo-groups/1 shows a for to detail a todo-group with id 1', function(assert) {
  const group = server.create('todo-group');
  visit('/todo-groups/1');

  andThen(function() {
    assert.equal(currentRouteName(), 'todo-group.detail',
      'The url /todo-groups/1 loads the "todo-group.detail" route.');
    assert.equal(currentURL(), '/todo-groups/1',
      'The "todo-group.detail" route does not redirect without user interaction');
    assert.equal(findWithAssert('.page-title').text().trim(),
      `${group.title}`,
      'There is an element with a class "page-title" that says "Editing "' +
      ' then the current group title.' +
      'Current title is: ' + group.title);
  });
});

test('visiting /todo-groups/1 shows a list of todo-items that belong to todo-group with id 1', function(assert) {
  server.create('todo-group');
  const [item] = server.createList('todo-item', 4, {
    todoGroupId: 1,
  });
  server.create('todo-item', {
    todoGroupId: 2,
  });

  visit('/todo-groups/1');

  andThen(function() {

    assert.equal(findWithAssert('.collection__item').length, 5,
      'There should be a "collection__item" for each "todo-group" record in the API.' +
      'To do this you should load the models from Ember Data into your template');

    assert.equal(findWithAssert('.todo-item__name:first').text().trim(), item.name,
      'For each "todo-group" pulled from the API, there should be an element with the class' +
      '"todo-group__name" filled with the name of the looped over todo.' +
      '(Note: this only tests the name of the first group, but should give the same result)');
  });
});

test('user can see done value of todo-items on the todo-group.detail page', function(assert) {
  server.create('todo-group');
  // Create 4 todo-items belonging to group 1
  // Odd items are marked as done, even are not
  server.createList('todo-item', 4, {
    todoGroupId: 1,
    done(index) {
      return index % 2 === 1;
    }
  });

  visit('/todo-groups/1');

  andThen(function() {

    assert.equal(findWithAssert('span.todo-item__done.fa').length, 4,
      'There should be a font awesome span with an extra class of "todo-item__done", ' +
      'for each "todo-item" related to the current todo-group.');

    assert.ok(findWithAssert('span.todo-item__done.fa:eq(1)').hasClass('fa-check-square-o'),
      'For each "todo-item" marked done pulled from the API, ' +
      'there should be a font-awesome span with a class "fa-check-square-o"');

    assert.ok(findWithAssert('span.todo-item__done.fa:eq(0)').hasClass('fa-square-o'),
      'For each "todo-item" not marked done pulled from the API, ' +
      'there should be a font-awesome span with a class "fa-square-o"');
  });
});

test('user can change toggle "done" value of todo-items', function(assert) {
  server.create('todo-group');
  // Create 4 todo-items belonging to group 1
  // Odd items are marked as done, even are not
  server.createList('todo-item', 2, {
    todoGroupId: 1,
    done(index) {
      return index % 2 === 1;
    }
  });

  visit('/todo-groups/1');

  click('.todo-item__toggle:first');
  click('.todo-item__toggle:last');

  andThen(function() {
    const [item1, item2] = server.db.todoItems;

    assert.ok(findWithAssert('span.todo-item__done.fa:last').hasClass('fa-square-o'),
      'The last todo in the list should be changed from done to not done, ' +
      'and there should be a font-awesome span with a class "fa-square-o" to represent this');

    assert.ok(findWithAssert('span.todo-item__done.fa:first').hasClass('fa-check-square-o'),
      'The last todo in the list should be changed from not done to done, ' +
      'and there should be a font-awesome span with a class "fa-check-square-o" to represent this');

    assert.equal(item1.done, true);
    assert.equal(item2.done, false);
  });
});

test('user can delete todo-items when visiting /todo-groups/1', function(assert) {
  server.create('todo-group');
  server.createList('todo-item', 3, {
    todoGroupId: 1,
  });

  visit('/todo-groups/1');
  // Clicks the second element (position 1) with a classs ".delete-btn"
  click('.delete-btn:eq(1)');


  andThen(function() {
    assert.equal(findWithAssert('.collection__item').length, 3,
      'There should be one fewer "collection__item" since the todo-item should be deleted' +
      'after clicking the second ".delete-btn"');
    assert.equal(server.db.todoItems.length, 2,
      'The deleted item should also be deleted in the API!');

    assert.equal(currentURL(), '/todo-groups/1',
      'The url should not change after deleting a category.');
  });
});

test('user can add new todo-items when visiting /todo-groups/1', function(assert) {
  server.create('todo-group');
  server.createList('todo-item', 2, {
    todoGroupId: 1,
  });

  visit('/todo-groups/1');
  fillIn('.todo-item-name', 'Walk the dog');
  click('.submit');

  andThen(function() {
    const newItem = server.db.todoItems.find(3);
    console.log(newItem);

    assert.equal(findWithAssert('.collection__item').length, 4,
      'There should be one more "collection__item" since the a new todo-item was added' +
      'after submitting the form');
    assert.equal(findWithAssert('.todo-item-name').val(), '',
      'The title input should be emptied out after submitting');

    assert.equal(newItem.done, false, 'Submitting the form should create a new "todo-item" and set done to false');
    assert.equal(newItem.name, 'Walk the dog', 'Submitting the form should create a new "todo-item" and set name to the input');
    assert.equal(newItem.groupId, 1, 'Submitting the form should create a new "todo-item", ' +
      'and attach it to the current todo-group');
  });
});
