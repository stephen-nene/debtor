"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/redux/hooks"
import { toggleDebtStatus, deleteDebt } from "@/lib/redux/slices/debtsSlice"
import type { Debt } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

interface DebtListProps {
  debts: Debt[]
}

export function DebtList({ debts }: DebtListProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleToggleStatus = (id: string) => {
    dispatch(toggleDebtStatus(id))
  }

  const handleEdit = (id: string) => {
    router.push(`/dashboard/edit/${id}`)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this debt?")) {
      dispatch(deleteDebt(id))
    }
  }

  if (debts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">No debts found.</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Debtor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Due Date</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts.map((debt) => (
              <TableRow key={debt.id} className={debt.isPaid ? "opacity-60" : ""}>
                <TableCell>
                  <Checkbox checked={debt.isPaid} onCheckedChange={() => handleToggleStatus(debt.id)} />
                </TableCell>
                <TableCell className="font-medium">
                  {debt.debtor}
                  <div className="md:hidden text-xs text-muted-foreground">Due: {formatDate(debt.dueDate)}</div>
                </TableCell>
                <TableCell>${debt.amount.toFixed(2)}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(debt.dueDate)}</TableCell>
                <TableCell className="hidden md:table-cell">{debt.location}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(debt.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(debt.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
