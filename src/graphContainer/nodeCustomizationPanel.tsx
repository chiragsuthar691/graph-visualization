import { Handle, Position } from "@xyflow/react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "@/colorPicker";
import FontSizeControl from "@/fontSizeControl";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { memo } from "react";
import UndoRedoControls from "./undoRedoControls";

const handleStyles = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: "#fff",
  border: "1px solid black",
};

interface CustomNodeProps {
  id: string;
  label: string;
  color: string;
  fontSize: number;
}

const CustomNode = ({ data, id }: { id: string; data: CustomNodeProps }) => {
  const { nodeStyles } = useSelector((state: RootState) => state.nodeStyling);

  return (
    <div
      style={{
        backgroundColor: nodeStyles?.[id]?.color || "white",
      }}
      className="w-[220px] group rounded-md border border-indigo-400 outline hover:outline-4 hover:outline-indigo-300 outline-indigo-100 hover:border-indigo-400 transition-all duration-600 ease-in-out "
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`handle-${id}`}
        style={{
          ...handleStyles,
        }}
      />
      <div
        className="p-2.5 space-y-2"
        style={{ fontSize: `${nodeStyles?.[id]?.fontSize}px` }}
      >
        {data?.label}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`handle-${id}`}
        style={{
          ...handleStyles,
        }}
      />
      <div className="absolute right-1 top-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-7 px-2">
              <Settings />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-1">
              <div className="mb-2">
                <h4 className="font-medium leading-none">Customization</h4>
              </div>
              <p className="text-sm text-muted-foreground">Color</p>

              <ColorPicker color={data?.color} nodeId={id} />
              <p className="text-sm text-muted-foreground">Font Size</p>
              <FontSizeControl fontSize={data?.fontSize} nodeId={id} />
              <p className="text-sm text-muted-foreground">Position</p>
              <UndoRedoControls nodeId={id} type="position" />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default memo(CustomNode);
