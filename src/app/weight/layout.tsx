"use server"
import { Stack } from "@mui/material"
import { WeightDataDisplay } from "./components/weight-entry"
import { WeightChart } from "./components/weight-chart"
import { WeightAddButton } from "./components/weight-add-button"
import { getMetricsByName } from "@/db/metrics.server"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { isFailure } from "@/lib/result"
import { MetricName } from "@/definitions/metrics"

export default async function Weight({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  const weightMetricsResult = await getMetricsByName(
    MetricName.WEIGHT,
    session.user.id
  )

  if (isFailure(weightMetricsResult)) {
    return <div>Error fetching weight data: {weightMetricsResult.message}</div>
  }

  const weightMetrics = weightMetricsResult.data

  return (
    <div>
      <Stack direction="column" justifyContent="center" style={{ gap: "2px" }}>
        <WeightChart data={weightMetrics} />
        <WeightAddButton />
        <WeightDataDisplay data={weightMetrics} />
      </Stack>
      {children}
    </div>
  )
}
