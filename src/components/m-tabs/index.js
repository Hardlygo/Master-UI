//mxins
import { ParentMixin } from "../../mixins/relation";
//提供取得slot的方法=》this.slots
import { SlotsMixin } from "../../mixins/slots";

//bem
import { createNameSpace, isDef } from "../../utils";
const { bem } = createNameSpace("tabs");

export default {
  name: "MTabs",
  mixins: [ParentMixin("MTabs"),SlotsMixin],
  props:{
      
  }
};
