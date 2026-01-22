import AmenitiesRules from "./AmenitiesRules";
import AvailabilityOwner from "./AvailabilityOwner";
import BasicInfo from "./BasicInfo";
import LocationDetails from "./LocationDetails";
import Media from "./Media";
import Pricing from "./Pricing";
import ReviewSubmit from "./ReviewSubmit";
import Specs from "./Specs";

export const ADD_PROPERTY_STEPS = [
  {
    id:"basic",
    title:"Basic Info",
    component: BasicInfo
  },
  {
    id:"location",
    title:"Location",
    component: LocationDetails
  },
 {
    id:"pricing",
    title:"Pricing",
    component: Pricing
  },
  {
    id:"spec",
    title:"Specifications",
    component: Specs
  },
  {
    id:"amenities",
    title:"Amenities and Rules",
    component: AmenitiesRules
  },
  {
    id:"media",
    title:"Media",
    component: Media
  },
  {
    id:"availability",
    title:"Availability",
    component: AvailabilityOwner
  },
  {
    id:"review",
    title:"Review & Submit",
    component: ReviewSubmit
  },
]