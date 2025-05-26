"use server"
import { Stack } from "@mui/material"
import { HRDataDisplay } from "./components/heart-rate-entry"
import { HeartRateChart } from "./components/heart-rate-chart"
import { HeartRateAddButton } from "./components/heart-rate-add-button"
import { getMetricsByName } from "@/db/metrics.server"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { isFailure } from "@/lib/result"
import { MetricName } from "@/definitions/metrics"

export default async function HeartRate({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  const heartRateMetricsResult = await getMetricsByName(
    MetricName.HEART_RATE,
    session.user.id
  )

  if (isFailure(heartRateMetricsResult)) {
    return (
      <div>
        Error fetching heart rate data: {heartRateMetricsResult.message}
      </div>
    )
  }

  const heartRateMetrics = heartRateMetricsResult.data

  return (
    <div>
      <Stack direction="column" justifyContent="center" style={{ gap: "2px" }}>
        <div style={{ margin: "0 auto" }}>
          <HeartRateChart data={heartRateMetrics} />
        </div>
        <HeartRateAddButton />
        <HRDataDisplay data={heartRateMetrics} />
      </Stack>
      {children}
    </div>
  )
}
