import "leaflet/dist/leaflet.css"
import L from "leaflet"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

import "react-leaflet-cluster/lib/assets/MarkerCluster.css"
import "react-leaflet-cluster/lib/assets/MarkerCluster.Default.css"

// ** rest of code here **
