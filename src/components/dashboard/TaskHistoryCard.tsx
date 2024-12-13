import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { History } from "lucide-react"

export const TaskHistoryCard = () => {
  // Placeholder data for recent tasks
  const recentTasks = [
    { id: 1, name: "Email Campaign Setup", status: "Completed", date: "2024-03-20" },
    { id: 2, name: "Social Media Post", status: "Failed", date: "2024-03-19" },
    { id: 3, name: "Lead Generation", status: "Completed", date: "2024-03-18" },
  ]

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <History className="h-5 w-5 text-gray-500" />
          <CardTitle className="text-lg font-medium">Recent Task History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </TableCell>
                <TableCell>{task.date}</TableCell>
              </TableRow>
            ))}
            {recentTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No recent tasks
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}