"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  PlusCircle,
  Settings,
  User,
  X,
} from "lucide-react"

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const username = useAppSelector((state) => state.auth.username)

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-xl font-bold">Debt Manager</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/dashboard"
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive("/dashboard") ? "text-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/analytics"
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive("/dashboard/analytics") ? "text-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              <PieChart className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive("/dashboard/settings") ? "text-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/add">
            <Button variant="outline" size="sm" className="hidden gap-1 md:flex">
              <PlusCircle className="h-4 w-4" />
              Add Debt
            </Button>
          </Link>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{username}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 pb-6">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 text-sm font-medium ${
                isActive("/dashboard") ? "text-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/analytics"
              className={`flex items-center gap-2 text-sm font-medium ${
                isActive("/dashboard/analytics") ? "text-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
              onClick={() => setIsMenuOpen(false)}
            >
              <PieChart className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-2 text-sm font-medium ${
                isActive("/dashboard/settings") ? "text-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link
              href="/dashboard/add"
              className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              onClick={() => setIsMenuOpen(false)}
            >
              <PlusCircle className="h-4 w-4" />
              Add Debt
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
