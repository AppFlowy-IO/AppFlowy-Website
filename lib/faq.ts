export interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface FAQAccordionProps {
  items: FAQItem[];
}
