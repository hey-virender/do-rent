import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
};
const DataCard = ({
  title,
  value,
  icon,
  change,
  trend,
  description,
}: Props) => {
  const changeColor = () => {
    if (trend === "down") {
      return "bg-red-500/30 text-red-700";
    }
    if (trend === "up") {
      return "bg-green-500/30 text-green-700";
    }
    if(trend === "neutral") {
      return "bg-gray-500/30 text-gray-700";
    }
    
  };
  return (
    <Card className="max-w-sm px-10 py-6">
      <div className="flex gap-4 items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div>{icon && icon}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-5xl font-medium">{value}</span>
        </div>
        <div className="flex flex-col items-end">
          {change && (
            <span className={cn(changeColor(), "px-5 py-1 rounded")}>
              {change}
            </span>
          )}
          {description && <span>{description}</span>}
        </div>
      </div>
    </Card>
  );
};

export default DataCard;
