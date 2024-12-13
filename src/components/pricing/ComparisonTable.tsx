import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const features = [
  { feature: "Monthly tasks", free: "100", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Team members", free: "1", pro: "Up to 10", enterprise: "Unlimited" },
  { feature: "Integrations", free: "5", pro: "50+", enterprise: "Custom" },
  { feature: "API access", free: "No", pro: "Yes", enterprise: "Yes" },
  { feature: "Custom workflows", free: "No", pro: "Yes", enterprise: "Yes" },
  { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom" },
  { feature: "Support", free: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
]

export const ComparisonTable = () => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Features</TableHead>
          <TableHead className="text-center">Free</TableHead>
          <TableHead className="text-center">Pro</TableHead>
          <TableHead className="text-center">Enterprise</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{row.feature}</TableCell>
            <TableCell className="text-center">{row.free}</TableCell>
            <TableCell className="text-center">{row.pro}</TableCell>
            <TableCell className="text-center">{row.enterprise}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)