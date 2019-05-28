export const getSharedSchemas = () => {
  return {
    $id: 'error',
    type: 'object',
    properties: {
      error: {
        type: 'object',
        properties: { code: { type: 'string' }, message: { type: 'string' } }
      }
    }
  };
};
