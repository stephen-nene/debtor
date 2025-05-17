"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DebtForm } from "@/components/debt-form"
import { useAppSelector } from "@/lib/redux/hooks"

export default function EditDebtPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const debt = useAppSelector((state) => state.debts.debts.find((debt) => debt.id === params.id))

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (!debt) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, debt, router])

  if (!isAuthenticated || !debt) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Debt</h1>
          <p className="text-muted-foreground">Update the details of this debt</p>
        </div>
        <DebtForm debtToEdit={debt} />
      </main>
    </div>
  )
}
