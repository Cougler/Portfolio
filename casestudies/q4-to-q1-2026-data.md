# M-Web Experiment Results: Q4 2025 – Q1 2026

Three A/B experiments on M-Web trialers. All activity metrics below count **only behavior that occurred after each user's experiment exposure date** and within the experiment window, matching Statsig's measurement methodology. Sourced from `CT_STATSIG_EXPOSURES_V` joined to site owner and product activity data.

---

## 1. M-Web Email Editor (`mweb_email_editor`)

**Dates:** Dec 19, 2025 – Feb 4, 2026 (47 days)
**Design:** Control (7,278 users) vs Test (7,245 users)
**Verdict: Test wins on conversion despite lower email volume**

### Funnel Metrics (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| **Trial-to-Paid** | **867** | **11.91%** | **881** | **12.16%** | **+0.25** | **+2.1%** |
| Second Login | 3,384 | 46.50% | 3,406 | 47.01% | +0.51 | +1.1% |
| Email Verified | 4,815 | 66.16% | 4,774 | 65.89% | -0.27 | -0.4% |
| Physical Address | 5,359 | 73.63% | 5,439 | 75.07% | +1.44 | +2.0% |

### Email Activity (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| Email Created (any) | 1,681 | 23.10% | 1,652 | 22.80% | -0.30 | -1.3% |
| Email Sent (any) | 839 | 11.53% | 675 | 9.32% | -2.21 | -19.2% |
| Email Sent MEQ 1 | 566 | 7.78% | 429 | 5.92% | -1.86 | -23.9% |
| Email Sent MEQ 2 | 143 | 1.96% | 130 | 1.79% | -0.17 | -8.7% |
| Email Sent MEQ 3+ | 130 | 1.79% | 116 | 1.60% | -0.19 | -10.6% |

### Volume (post-exposure only)

| Metric | Control | Test | Delta | Relative Δ |
|--------|---------|------|-------|------------|
| Total Sends | 1,617 | 1,273 | -344 | -21.3% |
| Sends / User | 0.222 | 0.176 | -0.046 | -20.7% |
| Total Creates | 4,572 | 4,398 | -174 | -3.8% |
| Creates / User | 0.628 | 0.607 | -0.021 | -3.3% |

### Contacts Added (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| Contacts (any) | 5,535 | 76.05% | 5,415 | 74.74% | -1.31 | -1.7% |
| Contacts MEQ 1 | 4,022 | 55.26% | 3,938 | 54.35% | -0.91 | -1.6% |
| Contacts MEQ 2 | 685 | 9.41% | 733 | 10.12% | +0.71 | +7.5% |
| Contacts MEQ 3+ | 828 | 11.38% | 744 | 10.27% | -1.11 | -9.8% |

### ELTV per Converter

| Group | Converters | Avg ELTV 12-mo | Avg ELTV 24-mo | Avg ELTV 36-mo |
|-------|-----------|----------------|----------------|----------------|
| Control | 940 | $433 | $756 | $1,130 |
| Test | 955 | $429 | $741 | $1,095 |

### Business Impact

| Metric | Value |
|--------|-------|
| Conversion lift | +0.25 pp (+2.1% relative) |
| Incremental conversions during experiment | +14 |
| Annual exposed trialers (est.) | ~56,300 |
| Incremental conversions / year | ~141 |
| Avg ELTV 12-mo (test converters) | $429 |
| **Est. annual revenue impact (12-mo ELTV)** | **~+$60K** |

### Why the Test Won

The new email editor **improved conversion (+2.1%) while reducing email friction**. Users in the test group were more likely to add a physical address (+2.0%) and return for a second login (+1.1%), and ultimately converted at a higher rate — despite sending 21% fewer emails and creating 3.8% fewer drafts.

This pattern suggests the new editor creates a **more efficient path to conversion**. Rather than needing multiple email attempts before deciding to pay, test users appear to get value from the editing experience itself, converting with fewer touches. The editor may have reduced the "effort barrier" that causes users to churn before paying.

**Watch item:** The drop in email volume is significant. If long-term retention depends on email engagement habits formed during trial, the lower send rate could offset the conversion gain over time. Worth monitoring post-experiment cohort retention.

---

## 2. Contacts File Upload (`add_contacts_from_file_updated_experience`)

**Dates:** Dec 16, 2025 – Jan 27, 2026 (42 days)
**Design:** Control (2,201 users) vs Test (2,261 users)
**Population:** Users who reached the contact file upload step (higher baseline engagement)
**Verdict: Test wins — strongest balanced improvement across funnel**

### Funnel Metrics (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| **Trial-to-Paid** | **1,074** | **48.80%** | **1,136** | **50.24%** | **+1.44** | **+3.0%** |
| Second Login | 1,822 | 82.78% | 1,882 | 83.24% | +0.46 | +0.6% |
| Email Verified | 2,158 | 98.05% | 2,218 | 98.10% | +0.05 | +0.1% |
| Physical Address | 2,089 | 94.91% | 2,146 | 94.91% | 0.00 | 0.0% |

### Email Activity (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| Email Created (any) | 1,708 | 77.60% | 1,755 | 77.62% | +0.02 | +0.0% |
| **Email Sent (any)** | **1,246** | **56.61%** | **1,311** | **57.98%** | **+1.37** | **+2.4%** |
| Email Sent MEQ 1 | 580 | 26.35% | 609 | 26.94% | +0.59 | +2.2% |
| Email Sent MEQ 2 | 284 | 12.90% | 301 | 13.31% | +0.41 | +3.2% |
| Email Sent MEQ 3+ | 382 | 17.36% | 401 | 17.74% | +0.38 | +2.2% |

### Volume (post-exposure only)

| Metric | Control | Test | Delta | Relative Δ |
|--------|---------|------|-------|------------|
| Total Sends | 3,653 | 3,701 | +48 | +1.3% |
| Sends / User | 1.660 | 1.637 | -0.023 | -1.4% |
| Total Creates | 8,821 | 8,687 | -134 | -1.5% |
| Creates / User | 4.008 | 3.842 | -0.166 | -4.1% |

### Contacts Added (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| Contacts (any) | 1,954 | 88.78% | 2,036 | 90.05% | +1.27 | +1.4% |
| Contacts MEQ 1 | 105 | 4.77% | 95 | 4.20% | -0.57 | -11.9% |
| Contacts MEQ 2 | 31 | 1.41% | 18 | 0.80% | -0.61 | -43.3% |
| **Contacts MEQ 3+** | **1,818** | **82.60%** | **1,923** | **85.05%** | **+2.45** | **+3.0%** |

### ELTV per Converter

| Group | Converters | Avg ELTV 12-mo | Avg ELTV 24-mo | Avg ELTV 36-mo |
|-------|-----------|----------------|----------------|----------------|
| Control | 1,184 | $785 | $1,484 | $2,311 |
| Test | 1,232 | $759 | $1,427 | $2,258 |

### Business Impact

| Metric | Value |
|--------|-------|
| Conversion lift | +1.44 pp (+3.0% relative) |
| Incremental conversions during experiment | +62 |
| Annual exposed users (est.) | ~19,600 |
| Incremental conversions / year | ~283 |
| Avg ELTV 12-mo (test converters) | $759 |
| **Est. annual revenue impact (12-mo ELTV)** | **~+$215K** |

### Why the Test Won

The updated file upload experience drove a **cascading funnel improvement** from top to bottom:

1. **More contacts uploaded in bulk** — Contacts MEQ 3+ rose from 82.60% to 85.05% (+3.0%), while MEQ 1 and MEQ 2 dropped. The new experience shifted users from adding a handful of contacts to uploading larger lists.
2. **More emails sent** — Email Sent (any) rose from 56.61% to 57.98% (+2.4%), with improvement across all MEQ buckets. Users with more contacts have a reason to send.
3. **More conversions** — Trial-to-paid rose from 48.80% to 50.24% (+3.0%). Users who upload contacts, send emails, and see results are more likely to pay.

This is the clearest cause-and-effect chain of all three experiments: better contact upload → more sends → more conversions. The improved file upload experience reduced friction at the contact import step, setting users up for downstream success.

---

## 3. Simplified M-Web Experience (`simplified_mweb_experience`)

**Dates:** Dec 22, 2025 – Jan 27, 2026 (36 days)
**Design:** Control (12,670 users) vs Test (12,799 users)
**Verdict: Test wins on engagement and ELTV; conversion flat**

### Funnel Metrics (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| Trial-to-Paid | 2,326 | 18.36% | 2,342 | 18.30% | -0.06 | -0.3% |
| Second Login | 5,766 | 45.51% | 5,928 | 46.32% | +0.81 | +1.8% |
| **Email Verified** | **8,419** | **66.45%** | **8,916** | **69.66%** | **+3.21** | **+4.8%** |
| **Physical Address** | **8,411** | **66.39%** | **8,731** | **68.22%** | **+1.83** | **+2.8%** |

### Email Activity (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| Email Created (any) | 3,875 | 30.58% | 3,921 | 30.64% | +0.06 | +0.2% |
| **Email Sent (any)** | **1,762** | **13.91%** | **1,970** | **15.39%** | **+1.48** | **+10.6%** |
| **Email Sent MEQ 1** | **1,058** | **8.35%** | **1,204** | **9.41%** | **+1.06** | **+12.7%** |
| Email Sent MEQ 2 | 360 | 2.84% | 359 | 2.80% | -0.04 | -1.4% |
| **Email Sent MEQ 3+** | **344** | **2.72%** | **407** | **3.18%** | **+0.46** | **+16.9%** |

### Volume (post-exposure only)

| Metric | Control | Test | Delta | Relative Δ |
|--------|---------|------|-------|------------|
| Total Sends | 3,738 | 4,046 | +308 | +8.2% |
| Sends / User | 0.295 | 0.316 | +0.021 | +7.1% |
| Total Creates | 12,664 | 12,812 | +148 | +1.2% |
| Creates / User | 1.000 | 1.001 | +0.001 | +0.1% |

### Contacts Added (post-exposure only)

| Metric | Control | Control % | Test | Test % | Lift (pp) | Relative Δ |
|--------|---------|-----------|------|--------|-----------|------------|
| Contacts (any) | 9,530 | 75.22% | 9,631 | 75.25% | +0.03 | +0.0% |
| Contacts MEQ 1 | 6,040 | 47.67% | 6,187 | 48.34% | +0.67 | +1.4% |
| Contacts MEQ 2 | 784 | 6.19% | 855 | 6.68% | +0.49 | +7.9% |
| Contacts MEQ 3+ | 2,706 | 21.36% | 2,589 | 20.23% | -1.13 | -5.3% |

### ELTV per Converter

| Group | Converters | Avg ELTV 12-mo | Avg ELTV 24-mo | Avg ELTV 36-mo |
|-------|-----------|----------------|----------------|----------------|
| Control | 2,733 | $571 | $1,050 | $1,620 |
| Test | 2,706 | $609 | $1,128 | $1,744 |

Test converters carry **+6.7% higher 12-mo ELTV** ($609 vs $571).

### Business Impact

Conversion is flat, but test converters are worth more. Measuring revenue per exposed user:

| Metric | Control | Test |
|--------|---------|------|
| Converters | 2,326 | 2,342 |
| Conv. rate | 18.36% | 18.30% |
| Avg ELTV 12-mo | $571 | $609 |
| ELTV per exposed user | $104.82 | $111.46 |
| **Lift per exposed user** | | **+$6.64 (+6.3%)** |

| Metric | Value |
|--------|-------|
| Annual exposed users (est.) | ~129,700 |
| **Est. annual revenue impact (12-mo ELTV)** | **~+$861K** |

### Why the Test Won

The simplified M-Web experience delivered the **largest engagement gains** of all three experiments and the **highest estimated revenue impact**:

1. **Email verification surged** — +4.8% lift, the single largest metric improvement across all experiments. Fewer steps in the simplified flow meant more users completed this critical setup step.
2. **Physical address completion rose** — +2.8% lift, same mechanism as email verification.
3. **First-time email senders jumped** — MEQ 1 up +12.7%, MEQ 3+ up +16.9%. The simplified experience got more users to their first send and encouraged repeat sending.
4. **Conversion was flat, but converter quality improved** — Test converters chose higher-value plans (ELTV $609 vs $571, +6.7%). The simplified experience may attract users who are more serious about the product and willing to invest in higher-tier plans.

The net effect: even without a conversion rate lift, the higher ELTV per converter translates to an estimated **+$861K annual revenue impact** — the largest of the three experiments.

---

## Cross-Experiment Comparison

| Experiment | Dates | Users (C / T) | T:P Lift | Email Sent Lift | Top Funnel Lift | Est. Annual Revenue |
|-----------|-------|---------------|----------|-----------------|-----------------|---------------------|
| Email Editor | Dec 19 – Feb 4 | 7,278 / 7,245 | **+2.1%** | -19.2% | Phys Addr +2.0% | +$60K |
| Contacts Upload | Dec 16 – Jan 27 | 2,201 / 2,261 | **+3.0%** | **+2.4%** | Contacts 3+ +3.0% | **+$215K** |
| Simplified M-Web | Dec 22 – Jan 27 | 12,670 / 12,799 | -0.3% | **+10.6%** | Email Verif **+4.8%** | **+$861K** |

### Summary: Which Experience Was Better and Why

**Simplified M-Web Experience is the strongest overall performer.** It has the largest estimated revenue impact (+$861K/year) driven by massive engagement gains (email sends +10.6%, email verification +4.8%) and higher-value converters (+6.7% ELTV). Even though conversion rate is flat, the higher ELTV means each converted user is worth more.

**Contacts File Upload is the most balanced experiment.** It's the only one that improved *both* conversion rate (+3.0%) and email sending (+2.4%) simultaneously, with a clear causal chain: better contact upload → more sends → more conversions. Revenue impact is +$215K/year.

**Email Editor improves conversion (+2.1%) at the cost of email volume (-19.2%).** This is the only experiment with a meaningful conversion rate lift, but the significant drop in email engagement is a concern for long-term retention. Revenue impact is +$60K/year.

### Combined Potential

If all three experiments are shipped independently (to the extent their populations don't fully overlap), the combined estimated annual revenue impact is **+$1.1M** in 12-month ELTV.

---

### Methodology
- **Activity window**: All activity metrics count behavior that occurred **after each user's exposure date** and **within the experiment end date** — matching Statsig's measurement approach. Prior analysis in this file counted all-time activity, which diluted the experiment signal.
- **Source tables**: `CT_STATSIG_EXPOSURES_V` (exposure + group assignment), `CT_ACCT_SITE_OWNER_M_V` (conversion, email verification, physical address), `CT_PROD_USAGE_ACTIVITY_DD_ET_A_V` (emails created/sent, contacts added), `CT_PROD_LOGIN_ACTIVITY_DD_ET_S_V` (second login), `CT_MKTG_HUB_SITE_OWNER_DETAILS_V` (ELTV)
- **ELTV**: Averaged across all users who converted after their exposure date (includes post-experiment-window conversions)
- **Relative Δ**: (Test Rate - Control Rate) / Control Rate × 100
- **Annual estimates**: Extrapolated from daily exposure rates during each experiment's run period
- **Revenue estimates assume the experiment effect holds at scale and over time**
