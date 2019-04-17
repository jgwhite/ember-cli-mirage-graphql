import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | customer comments', function(hooks) {
  setupApplicationTest(hooks);

  test('it displays the customer data', async function(assert) {
    let customer = this.server.create('customer');

    this.server.create('comment', { author: customer, body: 'My comment' });
    this.server.create('comment', { body: 'Someone else’s comment' });
    
    await visit(`/customer/${customer.id}/comments`);

    assert.dom('.comment').hasText('My comment');
    assert.dom('.comment').doesNotIncludeText('Someone else’s comment');
  });
});
