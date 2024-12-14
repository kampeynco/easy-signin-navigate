interface InvitationLoadingStateProps {
  message?: string
}

export const InvitationLoadingState = ({ 
  message = "Processing invitation..." 
}: InvitationLoadingStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-medium">{message}</h2>
        <p className="text-muted-foreground">
          Please wait while we process your invitation.
        </p>
      </div>
    </div>
  )
}