import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const features = [
  { feature: "Monthly tasks", starter: "100", grow: "Unlimited", scale: "Unlimited" },
  { feature: "Team members", starter: "1", grow: "Up to 10", scale: "Unlimited" },
  { feature: "Integrations", starter: "5", grow: "50+", scale: "Custom" },
  { feature: "API access", starter: "No", grow: "Yes", scale: "Yes" },
  { feature: "Custom workflows", starter: "No", grow: "Yes", scale: "Yes" },
  { feature: "Analytics", starter: "Basic", grow: "Advanced", scale: "Custom" },
  { feature: "Support", starter: "Email", grow: "Priority", scale: "24/7 Dedicated" },
]

export const ComparisonTable = () => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Features</TableHead>
          <TableHead className="text-center">Starter</TableHead>
          <TableHead className="text-center">Grow</TableHead>
          <TableHead className="text-center">Scale</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{row.feature}</TableCell>
            <TableCell className="text-center">{row.starter}</TableCell>
            <TableCell className="text-center">{row.grow}</TableCell>
            <TableCell className="text-center">{row.scale}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)