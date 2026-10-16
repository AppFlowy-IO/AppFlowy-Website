# AppFlowy database formula blog series

Five practical guides for people who want a working database calculation. Each article answers a distinct search intent, demonstrates the result in AppFlowy, and links to reusable templates. Target length: 1,000–1,400 words, including formulas, with a maximum reading time of 10 minutes at 200 words per minute.

| Article | Primary search intent | Canonical path | Main template | Supporting template |
| --- | --- | --- | --- | --- |
| AppFlowy Database Formulas: A Beginner's Guide | Learn how to add and write an AppFlowy formula | /blog/appflowy-database-formulas | Project Budget | Deadline Tracker |
| AppFlowy Date Formulas: Track Deadlines and Overdue Tasks | Calculate days left, overdue status, and review dates | /blog/appflowy-date-formulas-deadline-tracker | Deadline Tracker | Content Calendar |
| Build a Sprint Progress Bar with AppFlowy Formulas | Calculate percent complete and draw a progress bar | /blog/appflowy-formula-progress-bar | Sprint Progress | RICE Prioritization |
| Build a Project Budget Tracker with AppFlowy Formulas | Calculate remaining budget, spending percentage, and alerts | /blog/appflowy-project-budget-formulas | Project Budget | Deadline Tracker |
| RICE Prioritization in AppFlowy: Formula and Template | Calculate and interpret RICE scores in a feature backlog | /blog/appflowy-rice-prioritization-formula | RICE Prioritization | Sprint Progress |

## Article structure

Each article opens with the task and result, offers its main template near the beginning, lists the required property types, and walks through copyable formulas. Screenshots show the actual formula editor and the completed database. Worked examples explain the output, and a short troubleshooting or FAQ section addresses common mistakes. A final next step connects the article to a complementary template and another guide in the series.

The beginner guide owns broad syntax and setup questions. The four focused guides explain their own workflow without repeating the complete introduction. No unsupported claims about automated notifications, writing to other properties, or cross-row calculations.

## Templates and images

Templates belong to the Templates workspace, Shared space, under Database Formula Templates. Use synthetic project data only. Each database contains five sample rows, correctly typed input properties, and three saved Formula properties. Preserve blank and zero cases so readers can see the guards working.

Capture screenshots from the real AppFlowy product. Store optimized assets under `public/images/blog/database-formulas/`, with descriptive filenames and alt text. Images should show the relevant table or editor without unrelated workspace content. Screenshots of date-based examples use 13 October 2026 in Asia/Singapore; articles explain that live date results change.

Public template links must allow readers to view the examples without workspace access and duplicate them into their own AppFlowy workspace. Keep internal workspace IDs and authoring paths out of the published prose.

## Search and publishing

- Use a unique SEO title under 60 characters and a useful description around 150–160 characters.
- Set canonical categories to Using AppFlowy and Project management, with the project-management topic.
- Use descriptive internal links and explicit related articles for the series.
- Reuse the site's existing Article metadata, canonical URLs, table of contents, image components, and reading-time display.
- Verify formula examples against the actual templates, including missing inputs and zero denominators.
- Validate taxonomy, regenerate the sitemap, check SEO publishing, build the site, and inspect all five rendered routes on desktop and mobile.
- Prepare the content in a dedicated branch and pull request. Production uses the repository's manual deployment workflow after merge.

RICE attribution: [Intercom's original RICE explanation](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers). The AppFlowy implementation, sample initiatives, formulas, and screenshots are original.

## Completed deliverables

- Five MDX articles, each displaying a 7-minute reading time in the site's existing renderer. The article check report records word counts, metadata lengths, screenshots, and template links.
- Nine real AppFlowy screenshots and five cover graphics, with editable SVG sources and PNG exports for social previews.
- Five published, reusable databases in the Templates workspace → Shared → Database Formula Templates. Each contains five sample records and three saved formulas; all 75 sample formula results were verified after saving.
- Public template access verified in an anonymous browser. Each page exposes **Start with this template**; the action opens sign-in before duplication. Workspace and public links are in `database-formula-templates.json`.
- Canonical blog URLs, descriptions, BlogPosting structured data, related articles, topic membership, and the generated sitemap use the existing publishing system.

Keep the date-based screenshot reference at 13 October 2026 explicit. Live deadline and content-calendar results change with the current date. Publishing a template does not submit it to the Template Center marketplace.

## Validation

- `pnpm build` passed, including taxonomy, sitemap, SEO publishing, type checking, and generation of all five article routes. Two pre-existing spacing warnings remain in pricing components.
- All five routes returned HTTP 200 with the expected canonical URL and description; BlogPosting and BreadcrumbList structured data are present.
- Desktop (1440 × 1000) and mobile (390 × 844) checks passed for all five routes: images loaded, reading time was 7 minutes, and there was no page-level horizontal overflow. Covers and article screenshots were visually inspected.
- All five template links loaded sample rows in an anonymous browser and exposed the reuse action. Duplication requires the reader to sign in to their own workspace.

The blog articles are ready for review. They are not live on appflowy.com/blog until this branch is merged and the production deployment workflow runs.
