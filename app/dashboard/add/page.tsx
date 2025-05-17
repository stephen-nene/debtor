"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DebtForm } from "@/components/debt-form"
import { useAppSelector } from "@/lib/redux/hooks"

export default function AddDebtPage() {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Add New Debt</h1>
          <p className="text-muted-foreground">Record a new debt in your portfolio</p>
        </div>
        <DebtForm />
      </main>
    </div>
  )
}
