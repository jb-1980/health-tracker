import "server-only"
import { AsyncResult, Result } from "@/lib/result"
import { MongoCollection } from "./collection.server"
import { Metric, MetricDTO, MetricName } from "@/definitions/metrics"
import { ObjectId, OptionalId } from "mongodb"

export type MetricDocument = {
  _id: ObjectId
  userId: string
  timestamp: Date
} & Metric

export const Metrics = MongoCollection<MetricDocument>("metrics")

const makeMetricDTO = <T extends MetricName>(
  metric: Extract<MetricDocument, { name: T }>
): MetricDTO<T> => {
  return {
    name: metric.name,
    value: metric.value,
    id: metric._id.toString(),
    date: new Date(metric.timestamp).toISOString(),
  } as MetricDTO<T>
}

export async function getMetricsByName<T extends MetricName>(
  name: T,
  userId: string
): AsyncResult<MetricDTO<T>[], "DB_ERR_FAILED_TO_GET_METRIC"> {
  try {
    const metrics = (await Metrics.find(
      {
        name,
        userId,
      },
      {
        sort: { timestamp: -1 },
      }
    ).toArray()) as Extract<MetricDocument, { name: T }>[]

    return Result.Success(
      metrics.filter((m) => m.name === name).map(makeMetricDTO)
    )
  } catch (error) {
    console.error(error)
    return Result.Fail("DB_ERR_FAILED_TO_GET_METRIC", error)
  }
}

export const createMetric = async <T extends MetricName>(
  metric: OptionalId<Extract<MetricDocument, { name: T }>>
): AsyncResult<
  Extract<MetricDocument, { name: T }>,
  "DB_ERR_FAILED_TO_CREATE_METRIC"
> => {
  try {
    const result = await Metrics.insertOne(metric)
    if (result.insertedId) {
      return Result.Success({
        _id: result.insertedId,
        ...metric,
      } as Extract<MetricDocument, { name: T }>)
    }
    return Result.Fail(
      "DB_ERR_FAILED_TO_CREATE_METRIC",
      "Failed to create metric"
    )
  } catch (error) {
    console.error(error)
    return Result.Fail("DB_ERR_FAILED_TO_CREATE_METRIC", error)
  }
}

export const deleteMetric = async (
  id: string
): AsyncResult<true, "DB_ERR_FAILED_TO_DELETE_METRIC"> => {
  try {
    await Metrics.deleteOne({ _id: new ObjectId(id) })
    return Result.Success(true)
  } catch (error) {
    console.error(error)
    return Result.Fail("DB_ERR_FAILED_TO_DELETE_METRIC", error)
  }
}
