import { memo } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { updateNodeColorWithHistory } from "@/services/nodeStyling";
import UndoRedoControls from "@/graphContainer/undoRedoControls";

const ColorPicker = ({ color, nodeId }: { color: string; nodeId: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Get history for this specific node
  // const nodeHistory = useSelector(
  //   (state: RootState) => state.history.nodes[nodeId]
  // );

  // console.log("nodeHistory", nodeHistory);

  // const isUndoDisabled = !nodeHistory || nodeHistory.past.length === 0;
  // const isRedoDisabled = !nodeHistory || nodeHistory.future.length === 0;

  const handleChangeColor = (nodeId: string, color: string) => {
    dispatch(updateNodeColorWithHistory(nodeId, color));
  };

  return (
    <div className="flex items-center justify-between">
      <UndoRedoControls nodeId={nodeId} type="color" />
      <Input
        type="color"
        value={color}
        className="w-16 h-10 p-0"
        onChange={(e) => handleChangeColor(nodeId, e.target.value)}
      />
    </div>
  );
};

export default memo(ColorPicker);
