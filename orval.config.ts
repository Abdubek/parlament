import { defineConfig, OutputClient } from 'orval';

export default defineConfig({
  auth: getConfig("auth"),
  calendar: getConfig("calendar"),
  chat: getConfig("chat"),
  classifier: getConfig("classifier"),
  deputyRequest: getConfig("deputy-request"),
  fileTemplate: getConfig("file-template"),
  files: getConfig("files"),
  instances: getConfig("instances"),
  knowledge: getConfig("knowledge"),
  notification: getConfig("notification"),
  onlyofficeClient: getConfig("onlyoffice-client"),
  ruleMaking: getConfig("rule-making"),
  task: getConfig("task"),
  user: getConfig("user")
});

function getConfig(input) {
  return {
    input: getInputConfig(input),
    output: getOutputConfig(input),
    hooks: getHooksConfig(),
    preprocess: getPreprocessConfig(),
  };
}

function getHooksConfig() {
  return {
    afterAllFilesWrite: "prettier --write",
  };
}


function getInputConfig(input) {
  return {
    target: './src/shared/api/schemas/' + input + '.json',
  };
}

function getOutputConfig(input) {
  return {
    target: './src/shared/api/generated/' + input,
    schemas: './src/shared/api/generated/' + input + '/model',
    client: OutputClient.REACT_QUERY,
    prettier: true,
    override: {
      operationName: (operation) => {
        const prefix = kebabToCamel(input);
        const original = operation.operationId || "";
        return prefix.charAt(0).toUpperCase() + prefix.slice(1) + original.charAt(0).toUpperCase() + original.slice(1);
      },
      mutator: {
        path: "./src/shared/api/api-mutators.ts",
        name: kebabToCamel(input) + 'ApiMutator',
      },
      query: {
        useQuery: true,
        useInfiniteQuery: true
      },
    },
  };
}

function getPreprocessConfig() {
  return {
    preprocess: schema => {
      if (schema.components?.securitySchemes?.bearerAuth) {
        delete schema.components.securitySchemes.bearerAuth.name;
        delete schema.components.securitySchemes.bearerAuth.in;
      }
      return schema;
    },
  };
}

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

    