# Mobile Web Email Editor

**PLG Growth Experiment | A/B Test | Dec 19, 2025 – Feb 4, 2026**

**Role:** Product Design, UX Strategy, Interaction Design
**Team:** PLG growth, Experimentation
**Tools:** Figma, Notion, Statsig, Cursor, Snowflake MCP

---

## Overview

Mobile web had no email editor, which meant activation was structurally impossible for every trial user who landed there. I designed a full mobile web email editor, adapted from a validated native design I had built eighteen months earlier on the mobile app team. We A/B tested it across 14,523 users. Email sends dropped 19.2%, but trial-to-paid conversion improved 2.1%, indicating the editor replaced confusion-driven sends with intentional ones and created a more efficient path to payment.

| Metric | Value |
|--------|-------|
| Email sends | -19.2% |
| Trial-to-paid conversion | +2.1% |

---

## The Problem

The activation funnel on mobile web was structurally incomplete. Users could verify their email, add a physical address, and import contacts, but when they reached the point where they needed to create and edit an email, there was nothing there. The flow just stopped. Desktop users had a full editor. Mobile web users had no editor at all.

This meant that every mobile web trial user who completed the send-readiness steps and added contacts was still unable to activate. They had done the work to get ready to send, but the product couldn't take them the rest of the way. The result was a funnel that invested in getting users to the doorstep of activation and then locked the door.

The initial team plan was to ship a lightweight text-only editor to close the gap. That would have technically added the capability, but it wouldn't have changed the activation curve. A minimal editor checks a box. It doesn't give users a reason to iterate on their campaigns or come back to send a second email.

---

## Reframing the Approach

Eighteen months earlier, while on the native mobile app team, I had designed a complete mobile email editor. It was validated through usability testing where 10 out of 10 participants said they would want it immediately, but roadmap changes prevented it from shipping.

When I moved to the mobile web growth team and saw the same missing capability, I proposed adapting that validated design for the browser instead of starting from scratch. We already knew what users wanted. The question was whether the interaction model could translate to mobile web constraints: no native gestures, smaller hit targets, and browser viewport limitations.

I partnered with a senior engineer to map every native interaction to a browser equivalent. We simplified where necessary, replacing swipe-to-delete with explicit controls and converting long-press reordering to tap-and-drag, while preserving the modular content block architecture that made the original design work.

---

## Designing the Editor

The editor has two modes. In preview mode, users see their email as recipients would: a clean, scrollable view of the full campaign. Tapping any content block expands it into editing mode, where each block becomes individually editable with its own controls. This separation keeps the interface simple. Users are either looking at their email or editing a specific piece of it, never both at once.

Each block type (image, text, button, divider) has a focused editing sheet tuned to what that block actually needs. Text blocks surface inline editing with font size, weight, and color controls. Image blocks show crop and replace options. The goal was to give users enough control to make meaningful changes without recreating the complexity of the desktop editor.

**Images:**
- `expandingfordexterity.jpg` — Left: preview mode showing the email as recipients see it. Right: expanded editing mode with individually editable content blocks.
- `Textediting.jpg` — Text editing: inline content input with controls for color, font size, and weight, scoped to what the block needs.

---

## Completing the Send Flow

The editor needed a complete flow around it. For the activation path to actually work end to end, users needed a clear way to go from editing to sending. I designed the full flow: the email landing page that surfaces drafts and prompts the next action, the save-draft confirmation that lets users exit without losing work, and the scheduling screen that supports send-now, send-tomorrow, and custom date/time selection.

Each of these surfaces was designed to reduce the number of decisions between "I want to change something" and "it's sent." The fewer steps between editing and sending, the more likely users are to complete the activation loop and come back to send again.

In the previous experience, opening the editor automatically created an email behind the scenes. Every tap into the editor counted as a creation, whether the user did anything or not. We changed that. Now, if a user opens the editor and backs out without making any changes, nothing is saved and no creation is counted. If they edit anything at all, they're prompted to save their draft on exit, and only then does it count as a creation. This distinction is what makes the flat creation rate in the results meaningful: every creation in the test group represents a real decision to start a campaign.

**Images:**
- `savingdraft.jpg` — Left: email landing page with draft surfacing. Center: in-editor preview. Right: save draft confirmation, only triggered when the user has made a change.
- `schedulingcalendar.jpg` — Scheduling: send now, schedule for tomorrow, or pick a custom date and time.

---

## Results

The editor ran as an A/B test through Statsig from December 19, 2025 to February 4, 2026. The control group (7,278 users) had no mobile editor. The test group (7,245 users) had the full editing experience.

The headline finding was counterintuitive: the test group sent fewer emails but converted to paid at a slightly higher rate. Email sends dropped 17.2% across the board, yet trial-to-paid conversion ticked up by about 1%. Users with the editor needed fewer sends to reach the point where they were ready to pay.

This points to a quality-over-quantity effect. The editor gave users a higher degree of confidence in the emails they were creating. Rather than sending multiple low-effort campaigns (a pattern the old express send flow may have encouraged through confusion or perceived simplicity), users with the editor invested more in each send and arrived at a purchase decision faster.

### Trial-to-Paid Conversion

Users with the editor converted at a higher rate despite sending fewer emails, indicating a more efficient path to payment. Physical address completion also improved (+2.0%), suggesting the editor experience increased overall engagement with setup steps.

| Metric | Control | Test | Change |
|--------|---------|------|--------|
| T2P conversion | 11.9% | 12.2% | +2.1% |
| Physical address | 73.6% | 75.1% | +2.0% |

### Email Sending

Send volume dropped across all depth levels. This is the clearest evidence that the old flow was inflating send counts. The express send path in the control likely drove sends that were rooted in confusion or low commitment rather than genuine intent.

| Metric | Control | Test | Change |
|--------|---------|------|--------|
| Sent exactly 1 | 7.8% | 5.9% | -23.9% |
| Sent exactly 2 | 2.0% | 1.8% | -8.7% |
| Sent 3+ | 1.8% | 1.6% | -10.6% |

### Email Creation

In the previous experience, tapping the button that opened the editor automatically created an email behind the scenes. Just opening it counted as a creation. The new editor removed that behavior entirely. Overall creation rate stayed flat (-1.3%), but the MEQ breakdown reveals something more interesting: MEQ-1 dropped 6.9% while MEQ-2 jumped 17.5%. Users who previously created a single throwaway email were now creating a second one on purpose. The shift from shallow to deeper creation depth is a strong signal that the editor was driving intentional engagement rather than inflated counts.

| Metric | Control | Test | Change |
|--------|---------|------|--------|
| Created exactly 1 | 11.9% | 11.1% | -6.9% |
| Created exactly 2 | 4.2% | 5.0% | +17.5% |
| Created 3+ | 6.9% | 6.7% | -3.2% |

---

## Reflection

The biggest risk in this project was scope. The team's instinct was to ship a minimal text editor and iterate. I pushed for a fuller system because a text-only editor would have checked a box without giving users a real reason to invest in their campaigns. The editing experience needed to be good enough to build confidence, not just check a capability box.

The A/B results validated that instinct in an unexpected way. Sends went down, but conversion held steady and even ticked up. The editor didn't make users send more; it made each send more intentional. The drop in send volume is likely a signal that the old express send flow was generating sends driven by confusion or low commitment rather than genuine intent. Users with a real editor invested more in fewer emails and arrived at a purchase decision faster.

The system is currently in the process of being patented by the company. It continues to evolve as the foundation for all mobile web email editing.

---

## What's Next

The editor currently covers the core content types: text, images, buttons, and dividers. The next step is expanding to structural editing (columns, rows, and layout-level changes) that are available on desktop but not yet on mobile web.

The constraint going forward is intentional restraint. The desktop editor accumulated complexity over years of feature additions, and simplifying it has been an ongoing effort. On mobile web, we have the advantage of starting clean. Every addition needs to justify itself against the risk of recreating the same complexity problem on a more constrained surface.
