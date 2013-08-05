var test = require('tape');
var taskify = require('..');
var when = require('when');

require('./helpers/prepare-tasks');

test('use q', function(t) {
  t.plan(2);

  taskify.defaults({
    promiseLib: require('when')
  });

  t.ok(taskify.defaults('promiseLib'), 'have a promise lib');
  t.ok(typeof taskify.defaults('promiseLib').defer == 'function', 'have defer fn');
});

test('run a task and get a promise', function(t) {
  t.plan(1);
  taskify.run('a').promise.then(function() {
    t.pass('promise resolved');
  });
});

test('run tasks in parallel using promises', function(t) {
  var promises = ['a', 'b'].map(function(taskName) {
    return taskify.run(taskName).promise;
  });

  t.plan(1);
  when.all(promises).then(function() {
    t.pass('both tasks completed');
  });
});