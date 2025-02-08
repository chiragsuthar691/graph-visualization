import { memo } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { Redo2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redoAction, undoAction } from "@/services/history";

const UndoRedoControls = ({
  nodeId,
  type,
}: {
  nodeId: string;
  type: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex gap-1">
      <Button
        className="h-7 px-2"
        variant={"outline"}
        onClick={() => dispatch(undoAction(nodeId, type))}
      >
        <Undo2 size={7} className="w-2 h-2" />
      </Button>
      <Button
        className="h-7 px-2"
        variant={"outline"}
        onClick={() => dispatch(redoAction(nodeId, type))}
      >
        <Redo2 size={7} className="w-2 h-2" />
      </Button>
    </div>
  );
};

export default memo(UndoRedoControls);
