const { getExamples } = require('./exampleInfo');
const { getTypeDefs } = require('./typeDefInfo');
const { getPropTypes } = require('./propTypeInfo');
const { getMethods } = require('./methodInfo');
const { getConstants } = require('./constantInfo');

exports.getComponentDoc = (name, sdk) => {
  const component = sdk[name];

  if (!component) {
    throw new Error(`Component \`${name}\` does not exist in the SDK`);
  }

  const properties = Object.getOwnPropertyNames(component).map(
    (key) => component[key]
  );

  const propTypes = Object.getOwnPropertyNames(component.propTypes || {}).map(
    (key) => component.propTypes[key]
  );

  return {
    name,
    usage: `import { ${name} } from 'nr1'`,
    constants: getConstants(name, sdk),
    description: component.__docs__.text,
    examples: getExamples(name, sdk),
    propTypes: getPropTypes(component),
    methods: getMethods(name, sdk),
    typeDefs: getTypeDefs(properties.concat(propTypes), sdk),
  };
};

exports.getApiDoc = (name, sdk) => {
  const api = sdk[name];

  if (!api) {
    throw new Error(`API \`${name}\` does not exist in the SDK`);
  }

  const properties = Object.getOwnPropertyNames(api).map((key) => api[key]);

  return {
    name,
    usage: `import { ${name} } from 'nr1'`,
    constants: getConstants(name, sdk),
    description: api.__docs__.text,
    examples: getExamples(name, sdk),
    methods: getMethods(name, sdk),
    typeDefs: getTypeDefs(properties, sdk),
  };
};