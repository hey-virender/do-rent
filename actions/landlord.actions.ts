"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

function getDateRange(days: number) {
  const now = new Date();
  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const previousEnd = new Date();
  previousEnd.setDate(now.getDate() - days);

  return {
    currentStart,
    now,
    previousStart,
    previousEnd,
  };
}

function calculateChange(current: number, previous: number) {
  if (previous === 0) {
    return {
      change: current > 0 ? 100 : 0,
      trend: current > 0 ? "up" : "neutral",
    };
  }

  const diff = ((current - previous) / previous) * 100;

  return {
    change: Math.abs(Number(diff.toFixed(1))),
    trend: diff > 0 ? "up" : diff < 0 ? "down" : "neutral",
  };
}

export const getDashboardOverview = async () => {
  const session = await auth();

  if (!session?.user || session.user.role !== "landlord") {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const landlordId = session.user.id;

  const { currentStart, now, previousStart, previousEnd } =
    getDateRange(30); // last 30 days comparison

  // 🔹 Current period
  const currentProperties = await prisma.property.count({
    where: {
      landlordId,
      createdAt: {
        gte: currentStart,
        lte: now,
      },
    },
  });

  const currentBookings = await prisma.property.count({
    where: {
      landlordId,
      meta: {
        status: "occupied",
      },
      updatedAt: {
        gte: currentStart,
        lte: now,
      },
    },
  });

  // 🔹 Previous period
  const previousProperties = await prisma.property.count({
    where: {
      landlordId,
      createdAt: {
        gte: previousStart,
        lt: previousEnd,
      },
    },
  });

  const previousBookings = await prisma.property.count({
    where: {
      landlordId,
      meta: {
        status: "occupied",
      },
      updatedAt: {
        gte: previousStart,
        lt: previousEnd,
      },
    },
  });

  const propertyChange = calculateChange(
    currentProperties,
    previousProperties
  );

  const bookingChange = calculateChange(
    currentBookings,
    previousBookings
  );

  const totalProperties = await prisma.property.count({
    where: { landlordId },
  });

  const totalBookings = await prisma.property.count({
    where: {
      landlordId,
      meta: { status: "occupied" },
    },
  });

  return {
    success: true,
    data: [
      {
        title: "Total Bookings",
        value: totalBookings,
        change: bookingChange.change,
        trend: bookingChange.trend,
      },
      {
        title: "Total Properties",
        value: totalProperties,
        change: propertyChange.change,
        trend: propertyChange.trend,
      },
    ],
  };
};