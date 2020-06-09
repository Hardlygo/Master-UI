import { createBEM } from "../bem";
export function createNameSpace(name) {
  name = "m-" + name;
  return { bem: createBEM(name) };
}
