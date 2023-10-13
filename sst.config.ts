import { SSTConfig } from "sst";
import { Function } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "test-live-container",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "python3.11",
    });
    app.stack(function Stack({ stack }) {

      const fn = new Function(stack, "Function", {
        runtime: "container",
        handler: "functions/test-live-container",
        url: true,
      });

      stack.addOutputs({
        fnUrl: fn.url,
      });
    });
  },
} satisfies SSTConfig;
