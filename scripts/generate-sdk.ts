import fs from "fs/promises";
import path from "path";
import axios from "axios";
import { execSync } from "node:child_process";

const DIR = "./src/shared/api";

const schemaDir = DIR + "/schemas";
const generatedDir = DIR + "/generated";

const urls = {
  auth: "https://api-parlament.paspay.kz/auth/v3/api-docs",
  calendar: "https://api-parlament.paspay.kz/calendar/v3/api-docs",
  chat: "https://api-parlament.paspay.kz/chat/v3/api-docs",
  classifier: "https://api-parlament.paspay.kz/classifier/v3/api-docs",
  "deputy-request":
    "https://api-parlament.paspay.kz/deputy-request/v3/api-docs",
  "file-template": "https://api-parlament.paspay.kz/file-template/v3/api-docs",
  files: "https://api-parlament.paspay.kz/files/v3/api-docs",
  instances: "https://api-parlament.paspay.kz/instances/v3/api-docs",
  knowledge: "https://api-parlament.paspay.kz/knowledge/v3/api-docs",
  notification: "https://api-parlament.paspay.kz/notification/v3/api-docs",
  "onlyoffice-client":
    "https://api-parlament.paspay.kz/onlyoffice-client/v3/api-docs",
  "rule-making": "https://api-parlament.paspay.kz/rule-making/v3/api-docs",
  task: "https://api-parlament.paspay.kz/task/v3/api-docs",
  user: "https://api-parlament.paspay.kz/user/v3/api-docs",
};

async function downloadSchemas() {
  await fs.mkdir(schemaDir, { recursive: true });

  for (const [name, url] of Object.entries(urls)) {
    const response = await axios.get(url);
    const schema = response.data;
    cleanSecuritySchemes(schema);
    const filePath = path.join(schemaDir, `${name}.json`);
    await fs.writeFile(filePath, JSON.stringify(schema, null, 2));
    console.log(`✅ Saved: ${filePath}`);
  }
}

function cleanSecuritySchemes(schema: {
  [key: string]: { [key: string]: object };
}) {
  if (
    schema.components &&
    schema.components.securitySchemes &&
    typeof schema.components.securitySchemes === "object"
  ) {
    for (const [, scheme] of Object.entries(
      schema.components.securitySchemes,
    )) {
      if (scheme && scheme.type === "http") {
        delete scheme.name;
        delete scheme.in;
      }
    }
  }
}

async function generateOrvalConfig() {
  const entries = Object.keys(urls).map((name) => {
    return `
  ${kebabToCamel(name)}: getConfig("${name}")`;
  });

  const content = `import { defineConfig, OutputClient } from 'orval';

export default defineConfig({${entries.join(",")}
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
    target: '${schemaDir}/' + input + '.json',
  };
}

function getOutputConfig(input) {
  return {
    target: '${generatedDir}/' + input,
    schemas: '${generatedDir}/' + input + '/model',
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

    `;
  await fs.writeFile("orval.config.ts", content);
  console.log("🛠️ orval.config.ts generated");
}

async function generateApiMutators() {
  const entries = Object.keys(urls).map((name) => {
    return `
export function ${kebabToCamel(name)}ApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("${name}")(config);
}`;
  });

  const content = `import { api } from './api';
import type { AxiosRequestConfig, AxiosResponse } from "axios";
  
function getApiMutator(prefix: string) {
  return function <T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const modifiedConfig = {
      ...config,
      url: prefix + config.url,
    };

    return api
      .request<T>(modifiedConfig)
      .then((response: AxiosResponse<T>) => response.data);
  };
}
${entries.join("\n")}
  `;
  await fs.writeFile(DIR + "/api-mutators.ts", content);
}

async function runOrval() {
  console.log("🚀 Running orval...");
  execSync("npx orval", { stdio: "inherit" });
}

async function main() {
  await downloadSchemas();
  await generateOrvalConfig();
  await generateApiMutators();
  await runOrval();
}

main().catch((err) => {
  console.log(err);
});

function kebabToCamel(str: string) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
