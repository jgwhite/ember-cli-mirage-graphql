export default function createPageInfo(edges, firstRecordId, lastRecordId) {
  let hasPreviousPage = false;
  let hasNextPage = false;
  let startCursor = edges[0].id;
  let endCursor = edges[edges.length - 1].id;

  if (edges.length) {
    hasPreviousPage = edges[0].id !== firstRecordId;
    hasNextPage = edges[edges.length - 1].id !== lastRecordId;
  }

  return { startCursor, endCursor, hasNextPage, hasPreviousPage };
}
