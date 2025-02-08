import { AppDispatch } from "@/store";
import { INode, updateNodePosition } from "@/store/slices/graph";
import { Action, addToHistory } from "@/store/slices/historySlice";

export const updateNodePositionWithHistory =
  (nodeId: string, newPosition: { x: number; y: number }) =>
  (dispatch: AppDispatch, getState: () => any) => {
    const state = getState().graph;
    const node = state.nodes.find((node: INode) => node.id === nodeId);

    if (node) {
      const action: Action = {
        type: "position", // Type of action
        nodeId,
        prevValue: node.position, // Previous position before the update
        newValue: newPosition, // New position
      };

      // Dispatch the action to add to history
      dispatch(addToHistory(action));

      // Update the node position in the graph state
      dispatch(updateNodePosition({ nodeId, position: newPosition }));
    }
  };
