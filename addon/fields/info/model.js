import EmObject from '@ember/object';

export default EmObject.extend({
  name: null,
  args: null,
  fields: null,
  isList: false,
  isRelayConnection: false,
  isRelayEdges: false,
  parent: null,
  relayNode: null,
  resolvedFieldName: null,
  type: null
});
