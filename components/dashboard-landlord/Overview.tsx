import React, { use, useEffect, useState } from "react";
import DataCard from "../DataCard";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { getDashboardOverview } from "@/actions/landlord.actions";

const Overview = () => {
  const [dashboardData, setDashboardData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardOverview();
      if (result.success && result.data) {
        console.log(result);
        setDashboardData(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="flex justify-end items-center p-2">
        <Link href="/properties/new">
          <Button>+ New Property</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {dashboardData.length > 0 &&
          dashboardData.map((item, index) => (
            <DataCard
              key={index}
              title={item.title}
              value={item.value}
              change={item.change}
              trend={item.trend}
              icon={<ArrowBigRight />}
            />
          ))}
      </div>
      <section></section>
    </section>
  );
};

export default Overview;
