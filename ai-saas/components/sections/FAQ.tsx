import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { Accordion } from "@/components/ui/Accordion";

const FAQS = [
  {
    question: "How is this different from a workflow automation tool?",
    answer:
      "Automation tools run steps. Kiln's runtime makes judgment calls inside those steps — classifying, drafting, deciding when to hand off — and logs every one so you can audit or replay it later.",
  },
  {
    question: "What happens when an agent gets something wrong?",
    answer:
      "It's caught the same way a person catches it: the run is flagged, routed to a human queue with full context, and the correction feeds back into the next tempering pass.",
  },
  {
    question: "Which models does the runtime use?",
    answer:
      "Whichever you point it at. Kiln is model-agnostic — bring your own provider keys or use the ones we broker, and swap models per step without touching the workflow graph.",
  },
  {
    question: "Can I run this inside our own infrastructure?",
    answer:
      "Yes. Forge tier includes a dedicated runtime region, deployable in your VPC, with the same audit and replay tooling as the hosted product.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      data-section="faq"
      className="section flex flex-col justify-center gap-45 py-[136px]"
    >
      <SectionLabel index="09" title="Questions" />

      <div className="grid grid-cols-1 gap-31 md:grid-cols-[1fr_1.6fr] md:gap-68">
        <h2 className="max-w-[14ch] text-[9vw] leading-[0.95] sm:text-heading">
          <SplitText text="Before you ask sales." />
        </h2>
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
