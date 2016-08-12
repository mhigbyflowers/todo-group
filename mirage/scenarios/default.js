import { faker } from 'ember-cli-mirage';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  server.createList('todo-group', 10);
  server.createList('todo-item', 10, {
    todoGroupId() {
      return faker.random.number({
        min: 1,
        max: 3
      });
    },
  });
}
