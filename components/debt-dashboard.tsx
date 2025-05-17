"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import Link from "next/link"
import { useAppSelector } from "@/lib/redux/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DebtList } from "@/components/debt-list"
import { DebtSummary } from "@/components/debt-summary"
import { DebtChart } from "@/components/debt-chart"

export function DebtDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const debts = useAppSelector((state) => state.debts.debts)

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0)
  const pendingDebts = debts.filter((debt) => !debt.isPaid)
  const paidDebts = debts.filter((debt) => debt.isPaid)
  const pendingAmount = pendingDebts.reduce((sum, debt) => sum + debt.amount, 0)
  const paidAmount = paidDebts.reduce((sum, debt) => sum + debt.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all">All Debts</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <DebtSummary />
          <DebtChart />
        </TabsContent>
        <TabsContent value="all">
          <DebtList debts={debts} />
        </TabsContent>
        <TabsContent value="pending">
          <DebtList debts={pendingDebts} />
        </TabsContent>
        <TabsContent value="paid">
          <DebtList debts={paidDebts} />
        </TabsContent>
      </Tabs>

      {debts.length === 0 && (
        <Card className="mt-6">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="mb-4 text-center text-muted-foreground">You haven't added any debts yet.</p>
            <Link href="/dashboard/add">
              <Button>Add Your First Debt</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
