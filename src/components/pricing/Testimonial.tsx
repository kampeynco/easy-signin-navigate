import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialProps {
  author: string
  role: string
  content: string
  avatarUrl?: string
}

export const Testimonial = ({ 
  author, 
  role, 
  content, 
  avatarUrl 
}: TestimonialProps) => (
  <div className="space-y-4">
    <p className="text-muted-foreground italic">{content}</p>
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
)