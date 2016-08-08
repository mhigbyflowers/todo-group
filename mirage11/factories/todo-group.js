import { Factory, faker } from 'ember-cli-mirage';


export default Factory.extend({
title(){
  return faker.random.word();
  // debugger;
}
});
