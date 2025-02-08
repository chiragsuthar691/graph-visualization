import {
  MiniMap,
  ReactFlow,
  Controls,
  Background,
  NodeChange,
  applyNodeChanges,
  ConnectionLineType,
  type NodeTypes,
} from "@xyflow/react";
import { useCallback } from "react";
import { AppDispatch, RootState } from "@/store";
import CustomNode from "./nodeCustomizationPanel";
import { useDispatch, useSelector } from "react-redux";
import { INode, setNodes } from "@/store/slices/graph";

import "@xyflow/react/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes: NodeTypes = {
  customNode: CustomNode,
};

const Flow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nodes = [], edges = [] } = useSelector(
    (state: RootState) => state.graph
  );
  const history = useSelector((state: RootState) => state.history);
  console.log("history", history);

  const onNodesChange = useCallback(
    (changes: NodeChange<INode>[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  // const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  //   if (event?.dataTransfer?.getData("application/reactflow")) {
  //     const appData = JSON.parse(
  //       event.dataTransfer.getData("application/reactflow")
  //     );
  //   }
  // }, []);

  console.log("nodes", nodes);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        onNodesChange={onNodesChange}
        // onDragOver={onDragOver}
        // onEdgesChange={onEdgesChange}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Background color="#111" gap={20} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Flow;
