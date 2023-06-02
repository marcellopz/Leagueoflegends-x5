import React from "react";
import { useParams } from "react-router-dom";

export default function PlayerPage() {
  const routerParams = useParams();
  console.log(routerParams);
  return <div className="text-red-400">PlayerPage</div>;
}
