"use server"
import { Stack } from "@mui/material"
import { BPDataDisplay } from "./components/bp-entry"
import { BPChart } from "./components/bp-chart"
import { AddBPButton } from "./components/bp-add-button"
import { getMetricsByName } from "@/db/metrics.server"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { isFailure } from "@/lib/result"
import { MetricName } from "@/definitions/metrics"

export default async function BloodPressure({
  children,
}: {
  children?: React.ReactNode
}) {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  const bloodPressureMetricsResult = await getMetricsByName(
    MetricName.BLOOD_PRESSURE,
    session.user.id
  )

  if (isFailure(bloodPressureMetricsResult)) {
    return (
      <div>
        Error fetching blood pressure data: {bloodPressureMetricsResult.message}
      </div>
    )
  }

  const bloodPressureMetrics = bloodPressureMetricsResult.data

  return (
    <div>
      <Stack direction="column" justifyContent="center" style={{ gap: "2px" }}>
        <div style={{ margin: "0 auto" }}>
          <BPChart data={bloodPressureMetrics} />
        </div>
        <AddBPButton />
        <BPDataDisplay data={bloodPressureMetrics} />
      </Stack>
      {children}
    </div>
  )
}
