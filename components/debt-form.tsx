"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addDebt, updateDebt } from "@/lib/redux/slices/debtsSlice"
import type { Debt } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateId } from "@/lib/utils"

interface DebtFormProps {
  debtToEdit?: Debt
}

export function DebtForm({ debtToEdit }: DebtFormProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isEditing = !!debtToEdit

  const [formData, setFormData] = useState<Omit<Debt, "id">>({
    debtor: debtToEdit?.debtor || "",
    amount: debtToEdit?.amount || 0,
    dueDate: debtToEdit?.dueDate || "",
    location: debtToEdit?.location || "",
    description: debtToEdit?.description || "",
    isPaid: debtToEdit?.isPaid || false,
    createdAt: debtToEdit?.createdAt || new Date().toISOString(),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseFloat(value)
    setFormData((prev) => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPaid: checked }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.debtor.trim()) {
      newErrors.debtor = "Debtor name is required"
    }

    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (isEditing && debtToEdit) {
      dispatch(
        updateDebt({
          id: debtToEdit.id,
          ...formData,
        }),
      )
    } else {
      dispatch(
        addDebt({
          id: generateId(),
          ...formData,
        }),
      )
    }

    router.push("/dashboard")
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="debtor">Who Owes You</Label>
              <Input
                id="debtor"
                name="debtor"
                placeholder="Enter name"
                value={formData.debtor}
                onChange={handleChange}
              />
              {errors.debtor && <p className="text-sm text-red-500">{errors.debtor}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount || ""}
                onChange={handleNumberChange}
              />
              {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
              {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Where</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter details about this debt"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isPaid" checked={formData.isPaid} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="isPaid">Mark as paid</Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update Debt" : "Add Debt"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
