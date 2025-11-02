import { MonitoringDashboard } from "@/components/monitoring-dashboard"
import { AnimatedPage } from "@/components/ui/animated"

export default function MonitoringPage() {
  return (
    <AnimatedPage className="container mx-auto px-4 py-8">
      <MonitoringDashboard />
    </AnimatedPage>
  )
}
