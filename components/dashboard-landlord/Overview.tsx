import React from "react";
import DataCard from "../DataCard";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Overview = () => {
  return (
    <section>
      <div className="flex justify-end items-center p-2">
        <Link href="/properties/new"><Button>+ New Property</Button></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <DataCard
          title="Total Properties"
          change="+5%"
          value={120}
          icon={<ArrowBigRight />}
          description="vs last month"
        />
        <DataCard
          title="Total Properties"
          change="+5%"
          value={120}
          icon={<ArrowBigRight />}
          description="vs last month"
        />
        <DataCard
          title="Total Properties"
          change="+5%"
          value={120}
          icon={<ArrowBigRight />}
          description="vs last month"
        />
      </div>
      <section></section>
    </section>
  );
};

export default Overview;
