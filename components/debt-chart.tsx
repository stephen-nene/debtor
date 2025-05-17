"use client"

import { useAppSelector } from "@/lib/redux/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function DebtChart() {
  const debts = useAppSelector((state) => state.debts.debts)

  // Group debts by month for the chart
  const monthlyData = debts.reduce(
    (acc, debt) => {
      const date = new Date(debt.dueDate)
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`

      if (!acc[monthYear]) {
        acc[monthYear] = {
          month: monthYear,
          pending: 0,
          paid: 0,
        }
      }

      if (debt.isPaid) {
        acc[monthYear].paid += debt.amount
      } else {
        acc[monthYear].pending += debt.amount
      }

      return acc
    },
    {} as Record<string, { month: string; pending: number; paid: number }>,
  )

  // Convert to array and sort by date
  const chartData = Object.values(monthlyData)
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split("/").map(Number)
      const [bMonth, bYear] = b.month.split("/").map(Number)

      if (aYear !== bYear) return aYear - bYear
      return aMonth - bMonth
    })
    .map((item) => ({
      ...item,
      pending: Number.parseFloat(item.pending.toFixed(2)),
      paid: Number.parseFloat(item.paid.toFixed(2)),
    }))

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Debt Overview</CardTitle>
          <CardDescription>Breakdown of your debts by month</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">No data available to display</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Debt Overview</CardTitle>
        <CardDescription>Breakdown of your debts by month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              pending: {
                label: "Pending",
                color: "hsl(var(--chart-1))",
              },
              paid: {
                label: "Paid",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="pending" fill="var(--color-pending)" name="Pending" />
                <Bar dataKey="paid" fill="var(--color-paid)" name="Paid" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
