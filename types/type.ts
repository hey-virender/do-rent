export type Ref<T> = string | T;
export type ImageAsset = {
  url: string;
  fileId: string;
};

export type LandlordOverview = {
  properties: {
    total: number;
    occupied: number;
    vacant: number;
    occupancyRate: number;
  };
  rent: {
    expectedThisMonth: number;
    collectedThisMonth: number;
    pendingThisMonth: number;
    overdueAmount: number;
    overdueCount: number;
  };
  alerts: {
    leasesExpiringSoon: number;
    overdueTenants: number;
    vacantProperties: number;
  };
};
