import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, Text } from "@react-three/drei";
import { useLongPress } from "use-long-press";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["course_chapeau"].stop();
  }, [actions]);

  const [message, setMessage] = useState("");
  const clickRef = useRef(null);

  const handleClick = () => {
    setMessage("Clicked");
    if (message === "Clicked") {
      actions["pose_chapeau"].stop();
      actions["course_chapeau"].play();
    }
  };

  const handleDoubleClick = () => {
    setMessage("Double Clicked");
    actions["course_chapeau"].stop();
    actions["pose_chapeau"].play();
  };

  const onLongPress = () => {
    setMessage("Long Pressed");
    console.log("Long press triggered");
    actions["course_chapeau"].stop();
    actions["pose_chapeau"].stop();
  };

  const bind = useLongPress(onLongPress, {
    threshold: 500, // Long press threshold in milliseconds
  });

  return (
    <group
      ref={group}
      dispose={null}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      {...bind()}
    >
      <group rotation={[0, 0.01, 0]}>
        <primitive object={nodes.root} />
        <skinnedMesh
          geometry={nodes.Chapeau.geometry}
          material={materials["color_main.014"]}
          skeleton={nodes.Chapeau.skeleton}
        />
      </group>
      <Text position={[0, 2, 0]} fontSize={0.5} color="black">
        {message}
      </Text>
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf"
);
