import { TableCell, TableRow } from "@/components/ui/table"

export function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={3} className="text-center text-muted-foreground">
        No workflows found
      </TableCell>
    </TableRow>
  )
}