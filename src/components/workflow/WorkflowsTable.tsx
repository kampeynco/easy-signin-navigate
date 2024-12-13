import { Table, TableBody } from "@/components/ui/table"
import { WorkflowTableRow } from "./WorkflowTableRow"
import { WorkflowTableHeader } from "./WorkflowTableHeader"
import { LoadingState } from "./LoadingState"
import { EmptyState } from "./EmptyState"
import { useWorkflowData } from "@/hooks/useWorkflowData"
import { useState } from "react"
import { DeleteWorkflowDialog } from "./DeleteWorkflowDialog"

export function WorkflowsTable() {
  const { workflows, isLoading, handleDeleteWorkflow, handleToggleStatus } = useWorkflowData()
  const [workflowToDelete, setWorkflowToDelete] = useState<{ id: string, name: string } | null>(null)

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <>
      <Table>
        <WorkflowTableHeader />
        <TableBody>
          {workflows?.map((workflow) => (
            <WorkflowTableRow
              key={workflow.id}
              workflow={workflow}
              onDelete={setWorkflowToDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
          {workflows?.length === 0 && <EmptyState />}
        </TableBody>
      </Table>

      <DeleteWorkflowDialog
        workflowToDelete={workflowToDelete}
        onOpenChange={() => setWorkflowToDelete(null)}
        onConfirm={() => {
          if (workflowToDelete) {
            handleDeleteWorkflow(workflowToDelete)
            setWorkflowToDelete(null)
          }
        }}
      />
    </>
  )
}