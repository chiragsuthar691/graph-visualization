import { AppDispatch, RootState } from "@/store";
import { addToHistory } from "@/store/slices/historySlice";
import { setFontSize, setNodeColor } from "@/store/slices/nodeStyling";

export const updateNodeColorWithHistory =
  (nodeId: string, newColor: string) =>
  (dispatch: AppDispatch, getState: any) => {
    const prevColor =
      getState().nodeStyling.nodeStyles[nodeId]?.color || "white";
    dispatch(
      addToHistory({
        type: "color",
        nodeId,
        prevValue: prevColor,
        newValue: newColor,
      })
    );

    dispatch(setNodeColor({ nodeId, color: newColor }));
  };

export const updateFontSizeWithHistory =
  (nodeId: string, newFontSize: number) =>
  (dispatch: AppDispatch, getState: any) => {
    const prevSize = getState().nodeStyling.nodeStyles[nodeId]?.fontSize || 12;

    dispatch(
      addToHistory({
        type: "fontSize",
        nodeId,
        prevValue: prevSize,
        newValue: newFontSize,
      })
    );

    dispatch(setFontSize({ nodeId, fontSize: newFontSize }));
  };
