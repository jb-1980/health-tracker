"use server"
import { Stack } from "@mui/material"
import { CholesterolDataDisplay } from "./components/cholesterol-entry"
import { CholesterolChart } from "./components/cholesterol-chart"
import { CholesterolAddButton } from "./components/cholesterol-add-button"
import { getMetricsByName } from "@/db/metrics.server"
import { verifySession } from "@/auth/verify-session"
import { Navigate } from "@/components/navigate"
import { isFailure } from "@/lib/result"
import { MetricName } from "@/definitions/metrics"

export default async function Cholesterol({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()
  if (!session.isAuth) {
    return <Navigate to="/login" />
  }

  const cholesterolMetricsResult = await getMetricsByName(
    MetricName.CHOLESTEROL,
    session.user.id
  )

  if (isFailure(cholesterolMetricsResult)) {
    return (
      <div>
        Error fetching cholesterol data: {cholesterolMetricsResult.message}
      </div>
    )
  }

  const cholesterolMetrics = cholesterolMetricsResult.data

  return (
    <div>
      <Stack direction="column" justifyContent="center" style={{ gap: "2px" }}>
        <div style={{ margin: "0 auto" }}>
          <CholesterolChart data={cholesterolMetrics} />
        </div>
        <CholesterolAddButton />
        <CholesterolDataDisplay data={cholesterolMetrics} />
      </Stack>
      {children}
    </div>
  )
}
