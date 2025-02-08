import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { memo } from "react";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import UndoRedoControls from "@/graphContainer/undoRedoControls";
import { updateFontSizeWithHistory } from "@/services/nodeStyling";

const fontSizes = [
  { value: 12, label: "12px" },
  { value: 14, label: "14px" },
  { value: 16, label: "16px" },
  { value: 20, label: "20px" },
  { value: 24, label: "24px" },
];

const FontSizeControl = ({ nodeId }: { nodeId: string; fontSize: number }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeFontSize = (nodeId: string, fontSize: number) => {
    dispatch(updateFontSizeWithHistory(nodeId, fontSize));
  };
  const fontSize = useSelector(
    (state: RootState) => state.nodeStyling.nodeStyles[nodeId]?.fontSize || 12
  );

  return (
    <div className="flex items-center gap-2 justify-between">
      <UndoRedoControls nodeId={nodeId} type="fontSize" />
      <Select
        onValueChange={(e) => handleChangeFontSize(nodeId, Number(e))}
        value={String(fontSize)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fontSizes?.map((size) => (
              <SelectItem key={size?.value} value={String(size?.value)}>
                {size?.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default memo(FontSizeControl);
