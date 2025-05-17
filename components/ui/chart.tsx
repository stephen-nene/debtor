"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import type { TooltipProps } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("Chart components must be used within a ChartContainer")
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  // Set CSS variables for chart colors
  React.useEffect(() => {
    const root = document.documentElement
    Object.entries(config).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value.color)
    })

    return () => {
      Object.keys(config).forEach((key) => {
        root.style.removeProperty(`--color-${key}`)
      })
    }
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

function ChartTooltipContent({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  const { config } = useChartContext()

  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="text-xs font-medium">{label}</div>
      <div className="mt-1 space-y-0.5">
        {payload.map((item, index) => {
          const dataKey = item.dataKey as string
          const configItem = config[dataKey]

          if (!configItem) return null

          return (
            <div key={index} className="flex items-center gap-1 text-xs">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: configItem.color }} />
              <span className="font-medium">{configItem.label}:</span>
              <span>${Number(item.value).toFixed(2)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ChartTooltipContent.displayName = "ChartTooltip"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartLegend = RechartsPrimitive.Legend

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend }
