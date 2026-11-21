import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { approachIntro, approachSteps } from "@/content/approach";
import { ApproachTimeline } from "./approach-timeline";

/** Section 05 — how a project moves from idea to launch. */
export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-title" divider>
      <Container>
        <SectionHeading
          id="approach-title"
          eyebrow={approachIntro.eyebrow}
          index={approachIntro.index}
          title={approachIntro.title}
          description={approachIntro.description}
          layout="split"
        />
        <ApproachTimeline steps={approachSteps} />
      </Container>
    </Section>
  );
}
