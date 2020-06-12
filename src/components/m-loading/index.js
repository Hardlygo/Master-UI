import "./index.styl";
import MIcon from "../m-icon";
import { createNameSpace } from "../../utils/create";
const { bem } = createNameSpace("loading");
export default {
  name: "MLoading",
  render(h) {
    return (
      <div class={[bem("circle")]} style={{ fontSize: "23px" }}>
        <m-icon color="#fe718d" name="loading-circle"></m-icon>
      </div>
    );
  },
};
