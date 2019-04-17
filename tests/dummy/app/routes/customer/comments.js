import Route from '@ember/routing/route';
import query from 'dummy/gql/queries/customer/comments';
import { inject as service } from '@ember/service';

export default Route.extend({
  apollo: service(),

  model() {
    let variables = {
      id: this.modelFor('customer').customer.id
    };

    return this.get('apollo').watchQuery({ query, variables });
  }
});
