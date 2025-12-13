import DrafterPage from '@/components/pages/drafter/DrafterPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drafter')({
  component: Drafter,
})

function Drafter() {
  return (
    <>
      <title>Drafter - Open Seat Booking</title>
      <DrafterPage />
    </>
  )
}
