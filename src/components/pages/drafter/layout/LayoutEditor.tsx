import SeatToolkit from "@mezh-hq/react-seat-toolkit"
import "../../../../../node_modules/@mezh-hq/react-seat-toolkit/dist/index.css"

export function LayoutEditor() {

  return (
    <SeatToolkit
      mode="designer"
      events={{
        onSeatClick: (seat) => {
          console.log(seat)
        },
        onSeatSelectionChange(seats) {
          console.log(seats)
        },
      }}
      options={{
        showZoomControls: true,
        showAirplaneControl: true
      }}
      styles={{
        workspace: {
          container: {
            properties: {
              height: "100vh",
            }
          }
        },
      }}
    />
  )
}
