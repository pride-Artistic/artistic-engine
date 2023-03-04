import Engine from "src/engine";
import contextReset from "./context_reset";

export default (engine: Engine) => {
  const compatObject = {
    context_reset: contextReset(engine.Context),
  };
  Object.freeze(compatObject);
  return compatObject;
};
