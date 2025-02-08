import { AppDispatch, RootState } from "@/store";
import { updateNodePosition } from "@/store/slices/graph";
import { redo, undo } from "@/store/slices/historySlice";
import { setFontSize, setNodeColor } from "@/store/slices/nodeStyling";

export const undoAction =
  (nodeId: string, type: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const nodeHistory = getState().history.nodes[nodeId]; // Get specific node history
    if (!nodeHistory) return; // No history available

    const lastAction = nodeHistory.present; // Last action before undo
    dispatch(undo(nodeId)); // Dispatch undo for specific node
    if (lastAction) {
      console.log("lastAction", lastAction);
      if (lastAction.type === "color" && type === "color") {
        dispatch(setNodeColor({ nodeId, color: lastAction.prevValue }));
      } else if (lastAction.type === "fontSize" && type === "fontSize") {
        dispatch(setFontSize({ nodeId, fontSize: lastAction.prevValue }));
      } else if (lastAction.type === "position" && type === "position") {
        dispatch(
          updateNodePosition({ nodeId, position: lastAction.prevValue })
        );
      }
    }
  };

export const redoAction =
  (nodeId: string, type: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const nodeHistory = getState().history.nodes[nodeId]; // Get specific node history

    if (!nodeHistory) return; // No future actions available

    const nextAction = nodeHistory.present; // Next action in redo stack
    dispatch(redo(nodeId)); // Dispatch redo for specific node
    if (nextAction) {
      console.log("nextAction", nextAction);
      if (nextAction.type === "color" && type === "color") {
        dispatch(setNodeColor({ nodeId, color: nextAction.newValue }));
      } else if (nextAction.type === "fontSize" && type === "fontSize") {
        dispatch(setFontSize({ nodeId, fontSize: nextAction.newValue }));
      } else if (nextAction.type === "position" && type === "position") {
        dispatch(updateNodePosition({ nodeId, position: nextAction.newValue }));
      }
    }
  };
