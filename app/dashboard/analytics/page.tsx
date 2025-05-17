"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/redux/hooks"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DebtChart } from "@/components/debt-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const debts = useAppSelector((state) => state.debts.debts)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Calculate analytics data
  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0)
  const pendingDebts = debts.filter((debt) => !debt.isPaid)
  const paidDebts = debts.filter((debt) => debt.isPaid)
  const pendingAmount = pendingDebts.reduce((sum, debt) => sum + debt.amount, 0)
  const paidAmount = paidDebts.reduce((sum, debt) => sum + debt.amount, 0)

  // Group debts by debtor
  const debtorData = debts.reduce(
    (acc, debt) => {
      if (!acc[debt.debtor]) {
        acc[debt.debtor] = 0
      }
      acc[debt.debtor] += debt.amount
      return acc
    },
    {} as Record<string, number>,
  )

  // Convert to array and sort by amount
  const debtorChartData = Object.entries(debtorData)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5) // Top 5 debtors

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your debt portfolio</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
              <CardDescription>Across all accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDebt.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <CardDescription>Unpaid debts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{pendingDebts.length} debts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Paid</CardTitle>
              <CardDescription>Settled debts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${paidAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{paidDebts.length} debts</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="monthly">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
              <TabsTrigger value="debtors">Top Debtors</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="space-y-4">
              <DebtChart />
            </TabsContent>
            <TabsContent value="debtors">
              <Card>
                <CardHeader>
                  <CardTitle>Top Debtors</CardTitle>
                  <CardDescription>People who owe you the most</CardDescription>
                </CardHeader>
                <CardContent>
                  {debtorChartData.length > 0 ? (
                    <div className="space-y-4">
                      {debtorChartData.map((debtor) => (
                        <div key={debtor.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{debtor.name}</span>
                            <span>${debtor.amount.toFixed(2)}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{
                                width: `${(debtor.amount / debtorChartData[0].amount) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No data available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
