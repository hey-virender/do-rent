'use client'

import dynamic from "next/dynamic"

const Map = dynamic(() => import("./LeafletMap"), { ssr: false, loading: () => <div className="w-full h-full bg-gray-200 animate-pulse"></div> });

export default Map