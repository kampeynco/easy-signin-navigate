import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function WorkflowTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Created</TableHead>
        <TableHead className="w-[100px]"></TableHead>
      </TableRow>
    </TableHeader>
  )
}