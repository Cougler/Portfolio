# Contacts Upload Experience

**PLG Growth Experiment | A/B Test | Dec 16, 2025 – Jan 27, 2026**

**Role:** Product Design, UX Strategy, Interaction Design
**Team:** PLG growth, Experimentation
**Tools:** Figma, Notion, Statsig, Cursor, Snowflake MCP

---

## Overview

The contact file upload flow had significant drop-off at every stage, driven by a false completion signal, noisy mapping UI, and a blocking consent step. I redesigned the flow to eliminate those friction points without touching the underlying architecture. We A/B tested it across 4,462 users. The results showed the clearest cause-and-effect chain of all three experiments: better contact upload (+3.0% deep contacts) led to more sends (+2.4%) and more conversions (+3.0% T2P), translating to an estimated +$215K in annual revenue.

| Metric | Value |
|--------|-------|
| Deep contacts (3+) | +3.0% |
| Trial-to-paid conversion | +3.0% |
| Est. annual revenue | +$215K |

---

## The Problem

Analytics showed drop-off at every stage of the flow, but the most damaging issue wasn't a broken step — it was a false signal. After selecting a file, a green checkmark appeared on screen. To users, that looked like confirmation that the upload was complete. Many closed the browser and moved on, never knowing they still had mapping and consent steps ahead of them. The flow had an invisible exit built into it.

Beyond the false completion signal, the mapping interface was visually noisy and hard to parse. Help content was scattered across the UI rather than surfaced where it was needed. The consent step appeared as a blocking interruption that broke the forward momentum users had built. And when uploads failed, the error states were silent — no explanation, no recovery path. Each issue was individually minor. Together, they made completing the flow feel like work.

---

## Redesigning the Upload Flow

The redesign didn't touch the underlying architecture. Every change was aimed at reducing friction within the existing system. I removed the false completion signal and replaced it with progressive disclosure language that made the next step explicit. Primary actions after file selection were made more visually prominent so there was no ambiguity about where to go. The field mapping interface was simplified — less visual noise, clearer column relationships. Scattered help documentation was pulled out and replaced with contextual inline guidance at the moments users actually needed it. Consent was converted from a blocking step to an inline modal so it didn't interrupt the flow. And error states were rewritten to explain what went wrong and give users a clear path to recover.

None of these were large surface changes. The bet was that the cumulative effect of removing small friction at every step would meaningfully improve completion — and that the false completion signal alone was doing enough damage to move the primary metric on its own.

**Images (before/after pairs):**
- Upload initiation step — The original green checkmark signaled completion; the redesign makes the next step explicit.
- Field mapping step — Reduced visual noise and inline guidance replace the original scattered help content.
- Post-upload confirmation — The redesign gives users a clear success state and a forward path.

---

## Results

The experiment ran as an A/B test through Statsig from December 16, 2025 to January 27, 2026. The control group (2,201 users) and test group (2,261 users) were both users who reached the contact file upload step, so baseline rates are much higher than the general mWeb trialer population.

The redesigned flow shifted users toward deeper contact uploads. MEQ-3 (3+ contacts) improved +3.0%, and the downstream email sending metric for power senders (3+ emails) also improved +2.2%. Most importantly, these upstream gains cascaded into a +3.0% lift in trial-to-paid conversion, the clearest cause-and-effect chain of all three experiments: better contact upload led to more sends, which led to more conversions.

### Contact Upload Depth

The redesigned flow successfully pushed users toward uploading more contacts. MEQ-3 (3+) improved +3.0% while the shallower buckets decreased, indicating users who previously stopped at 1-2 contacts now continued through the full flow.

| Metric | Control | Test | Change |
|--------|---------|------|--------|
| Contacts 3+ | 82.6% | 85.1% | +3.0% |
| Contacts exactly 1 | 4.8% | 4.2% | -11.9% |
| Contacts exactly 2 | 1.4% | 0.8% | -43.3% |

### Downstream Behavior

Email sending improved across all depth levels, suggesting the deeper contact lists gave users more to work with and more reason to send. Overall send rate rose +2.4%, with improvement in every MEQ bucket.

| Metric | Control | Test | Change |
|--------|---------|------|--------|
| Email sent any | 56.6% | 58.0% | +2.4% |
| Email sent 3+ | 17.4% | 17.7% | +2.2% |
| Email created | 77.6% | 77.6% | +0.0% |
| Second login | 82.8% | 83.2% | +0.6% |

### Conversion

Trial-to-paid conversion rose +3.0%, the strongest balanced result of all three experiments. The causal chain is clear: better contact upload led to more sends, which led to more conversions. ELTV per converter was slightly lower in the test group ($759 vs $785), but the conversion lift more than compensates.

| Metric | Control | Test | Change |
|--------|---------|------|--------|
| T2P conversion | 48.8% | 50.2% | +3.0% |
| ELTV 12-mo per converter | $785 | $759 | -3.3% |
| Est. annual revenue impact | — | — | +$215K |

---

## Reflection

False completion signals are a specific category of UX problem worth naming. They don't generate support tickets. Users don't report them as bugs. They just leave, convinced they finished something they didn't. That invisibility is what makes them damaging. You can't see the exit in the data because it looks like a successful session.

This experiment produced the most balanced improvement of all three. The causal chain was visible in the data: users who went through the redesigned flow uploaded more contacts (+3.0% deep uploads), which gave them more reason to send (+2.4% email sends), which drove more conversions (+3.0% T2P). Each step in the funnel improved because the step before it did. That kind of cascading effect is rare in growth experiments and validates the principle that reducing friction at a high-intent moment can unlock downstream behavior.

The friction-reduction approach itself proved sound, and the team continues to apply it across other complex workflows in the product.
