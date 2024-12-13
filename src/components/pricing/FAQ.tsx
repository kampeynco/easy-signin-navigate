import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ = () => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>What is Kampeyn?</AccordionTrigger>
      <AccordionContent>
        Kampeyn is a powerful automation platform that helps businesses streamline their workflows and increase productivity.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>How does the pricing work?</AccordionTrigger>
      <AccordionContent>
        We offer flexible pricing plans starting from a free tier. You can choose the plan that best fits your needs and scale as your business grows.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Do you offer a money-back guarantee?</AccordionTrigger>
      <AccordionContent>
        Yes, we offer a 14-day money-back guarantee. If you're not satisfied with our service, we'll provide a full refund.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-4">
      <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
      <AccordionContent>
        We provide email support for all plans, with priority support for Pro users and dedicated support for Enterprise customers.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)