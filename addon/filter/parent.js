import { camelize } from 'ember-cli-mirage/utils/inflector'
import { ensureList } from '../utils';
import { get } from '@ember/object';

export function getParentInfo(parent, isRelayEdges) {
  let parentFieldName = get(parent, 'field.type.name');
  let parentRecord = parent.record;

  if (isRelayEdges) {
    parentFieldName = lookupInverse(parent.field) || get(parent, 'field.parent.field.type.name');
    parentRecord = get(parent, 'field.parent.record');
  }

  return [parentFieldName && camelize(parentFieldName), parentRecord];
}

function lookupInverse(field) {
  if (!field) {
    return;
  }
  let parentTypeName = get(field, 'parent.field.type.name');
  let modelClassName = camelize(parentTypeName);
  let modelClass = modelClassFor(modelClassName)
  if (!modelClass) {
    return;
  }
  let association = modelClass.associationFor(field.name);
  if (!association) {
    return;
  }
  let result = get(association, 'opts.inverse');

  return result;
}

function modelClassFor(name) {
  try {
    return server.schema.modelClassFor(name);
  } catch (error) {
    // No model class is registered for this name
    return;
  }
}

export const filterByParentField = (parentFieldName, parentId, records) =>
  records.filter((record) => get(record, `${parentFieldName}.id`) === parentId
                          || get(record, `${parentFieldName}Id`) === parentId);

export const composeFilterByParent = (getParentInfo, filterByParentField) =>
  (records, { field, fieldName }) => {
    if (!field.parent) {
      return records;
    }

    let [parentFieldName, parentRecord = {}] = getParentInfo(field.parent,
      field.isRelayEdges);
    let { id: parentId } = parentRecord;

    return parentId == null
      ? records
      : parentRecord[fieldName]
        ? ensureList(parentRecord[fieldName])
        : filterByParentField(parentFieldName, parentId, records);
  };

const filterByParent = composeFilterByParent(getParentInfo, filterByParentField);

export default filterByParent;
