"use client"

import { useAppSelector } from "@/lib/redux/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export function DebtSummary() {
  const debts = useAppSelector((state) => state.debts.debts)

  // Calculate summary statistics
  const totalAmount = debts.reduce((sum, debt) => sum + debt.amount, 0)
  const pendingAmount = debts.filter((debt) => !debt.isPaid).reduce((sum, debt) => sum + debt.amount, 0)
  const paidAmount = debts.filter((debt) => debt.isPaid).reduce((sum, debt) => sum + debt.amount, 0)

  // Find upcoming payments (sort by due date and take first 3 unpaid)
  const upcomingPayments = [...debts]
    .filter((debt) => !debt.isPaid)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3)

  // Find largest debts (top 3)
  const largestDebts = [...debts].sort((a, b) => b.amount - a.amount).slice(0, 3)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
          <CardDescription>Your next due payments</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingPayments.length > 0 ? (
            <ul className="space-y-4">
              {upcomingPayments.map((debt) => (
                <li key={debt.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{debt.debtor}</p>
                    <p className="text-sm text-muted-foreground">Due: {formatDate(debt.dueDate)}</p>
                  </div>
                  <p className="font-medium">${debt.amount.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No upcoming payments</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Largest Debts</CardTitle>
          <CardDescription>Your biggest outstanding amounts</CardDescription>
        </CardHeader>
        <CardContent>
          {largestDebts.length > 0 ? (
            <ul className="space-y-4">
              {largestDebts.map((debt) => (
                <li key={debt.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{debt.debtor}</p>
                    <p className="text-sm text-muted-foreground">{debt.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${debt.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{debt.isPaid ? "Paid" : "Pending"}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No debts recorded</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
