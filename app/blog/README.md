# Blog Writing Guidelines

## Directory Structure

### 1. Blog Post Directory

```plaintext
/_blog
    |-- 2023-11-16-seed.mdx
    |-- 2022-12-23-appflowy-1st-anniversary-and-2022-recap.mdx
    |-- ...
```

### 2. Image Directory

```plaintext

/public/images/blog
    |-- tech-design-flutter-rust
        |-- img.png
    |-- ...
```

## Document Structure

### MDX name

```plaintext
YYYY-MM-DD-title.mdx
```

### 1. Front Matter Configuration

```yaml
---
# Article title
title: 'Announcing AppFlowy $6.4M Seed Funding'    # Article title

# Article description - Recommended 150-160 characters, used for SEO and previews
description: Article description (150-160 characters)

# Author information
author: Author Name                                 # Author's name

# Path to author's avatar image
author_image_url: /images/blog/authors/avatar.png
# Format: PNG/JPG
# Size: 200x200px recommended
# Location: /public/images/blog/authors/

# Author's profile URL(optional)
author_url: https://github.com/username
# Can be GitHub, LinkedIn, personal website

# Article images
image: /images/blog/posts/cover.png
# Format: PNG/JPG
# Size: 1200x630px recommended
# Location: /public/images/blog/posts/

# Thumbnail for article listings
thumb: /images/blog/posts/thumbnail.png
# Format: PNG/JPG
# Size: 400x300px recommended
# Location: /public/images/blog/posts/

# Topics
categories: # Broad categories
  - Category 1                                    # General topics (e.g., "Frontend", "DevOps")
  - Category 2                                    # Max 2-3 categories recommended

# Article classification
tags: # Technical tags for filtering
  - Technical Tag 1                               # Be specific (e.g., "React", "TypeScript")
  - Technical Tag 2                               # Max 4-5 tags recommended

# Publication date - ISO format (YYYY-MM-DD)
date: '2024-01-01'
# Must use single quotes
# Must be valid date format

# Whether to pin the article to the top of the list(optional)
pinned: 1
# 1 = Pin to top of list with larger thumbnail
# 2 = Pin to top of list with smaller thumbnail
# 3 = Pin to top of list with smaller thumbnail                      

# Table of Contents heading depth
toc_depth: 3
# Range: 1-6
# 3 = h1, h2, h3 included

# Related articles(optional)
related:
  - 2023-11-01-demystifying-appflowy-editors-codebase
  - 2023-08-27-creating-a-calendar-view-for-the-appflowy-database
  - 2023-08-03-dont-try-to-load-code-dynamically-in-your-flutter-app-its-terrible
  - 2022-12-12-how-we-built-a-highly-customizable-rich-text-editor-for-flutter
---

```

### 2. Markdown Content

```markdown
Announcing our $6.4M seed round led by OSS Capital with participation from a group of open source founders, operators,
and luminaries.

We're excited to announce our $6.4M seed round led by OSS Capital with participation from Red Hat co-founder Bob Young,
YouTube co-founder Steve Chen, GitHub co-founder Tom Preston-Werner, Cloudera co-founder Amr Awadallah, Automattic
founder Matt Mullenweg, and a group of open source founders, operators, and luminaries, including Justin Hoffman,
Preetha Parthasarathy, Kevin Xu, Clint Smith, David Mytton, Paul Copplestone, Peer Richelsen, Maneesh Sharma, and Arek
Zarowski. This funding will be used to accelerate product development and grow our community.

### Our beginnings

When I was working on a proprietary enterprise collaboration platform at my previous company, I came to realize that
there isn't a one-size-fits-all workplace solution that suits every enterprise's needs well.

Likewise, workplace apps, such as Notion and Airtable, are often forced to prioritize features for some customers at the
expense of the rest. This usually leads to a poor cross-platform experience and products that struggle to scale without
becoming bulky and slow.

In addition, most proprietary collaboration workplace tools share a major limitation: their customers find it too hard
or too expensive to have 100% control of their data. As a result, vendor lock-in becomes a tough nut to crack. Users
often feel worried when entrusting their sensitive data with these tools, naturally worried about their longevity.

All of these restrictions motivated our mission to build AppFlowy: a secure, open source workspace for wikis and
projects, made to suit everyone.

- For enterprises, we enable you to customize a workspace with our modular open source building blocks and microservices
  that can adapt to your needs. These will easily fit into your existing workflow, and you don't have to worry about
  vendor lock in.
- For individuals, we put data control in your hands while ensuring the user interface works fast in an intuitive
  fashion.
- Built on an open source codebase with a community-driven open toolbox of plugins, templates, and themes, you can
  design and modify AppFlowy your way without limits.

We aim to enable everyone to unleash their potential and achieve more with secure workplace tools by upholding the core
values that have shaped AppFlowy from the very beginning:

- Data privacy first
- Community-driven extensibility
- Reliable and fast native app experience
- Continuous, fast-paced innovation
- Commitment to an open source philosophy

### The story so far

AppFlowy launched on GitHub in November 2021 as an open source, Rust-based project built from the ground up by a team of
two. Since our launch, we have grown a vibrant developer community consisting of hundreds of open source contributors
and 40,000 stars with over 2,600 forks. The Discord community has grown to more than 3,500 members.

Currently, AppFlowy offers the following benefits to its users:

- Take notes, track to-dos, and manage projects in a secure, local-first workspace.
- Build a detailed list of projects while tracking the status of each one with table and kanban-view databases.
- Create a bird's-eye calendar-view of important launch dates and deadlines on the same database.
- Craft beautiful documents with 20 types of content blocks. Write fast with Markdown and personalized shortcuts without
  losing your flow. Use custom fonts, highlights, and themes to present your work.
- Utilize the power of AI right inside AppFlowy without tool switching, permitting you to work faster with confidence.
  Choose when and what data you allow to be sent to an AI service without compromising your data privacy. Whether it's
  OpenAI or Stability AI, you can choose the AI service that works best for you.

AppFlowy is now available for download on Linux, macOS, and Windows
via [appflowy.io](https://appflowy.io/?ref=blog.appflowy.io) and our
GitHub [release page](https://github.com/AppFlowy-IO/AppFlowy/releases?ref=blog.appflowy.io). Additionally, you can find
AppFlowy in package managers such as Homebrew and Flathub.

### Bringing AppFlowy to the Cloud ☁️

We are excited to announce that today AppFlowy Cloud is now available in private beta mode and will soon become publicly
available. It is built for people who value privacy. With it, you:

- Can opt for end-to-end encryption, ensuring the utmost privacy and security of your data. No one (not even AppFlowy)
  has the technical means to access your data without your permission.
- Have the option to remain local and sync as required.

AppFlowy Cloud also supports docker
compose-based [deployment](https://github.com/AppFlowy-IO/AppFlowy-Cloud/blob/main/doc/deployment.md?ref=blog.appflowy.io),
designed for hassle-free self-hosting and customizable cloud storage management on platforms like Amazon EC2 or Azure
Virtual Machines.

### Looking ahead

We remain focused on building an open source, secure workspace for people who value privacy, customization, and a
cross-platform experience. We aim to make it fit for everyone by:

- Offering modular, embeddable, collaborative components
- Making a community-driven plugin marketplace
- Connecting AppFlowy with your existing workflows
- Providing built-in AI-powered automations to work smarter and faster
- Enabling businesses to integrate AI models of their choice into AppFlowy without sacrificing data privacy

Investor support from amazing open source founders and operators helps us to work towards our goal—to enable everyone to
achieve more with secure workplace tools—even faster.

### About AppFlowy Team

The team is made up of two founders and six founding engineers. The majority of the team consists of former Bytedance
engineers who worked on LarkSuite (Feishu), Bytehouse, TikTok, and Capcut. AppFlowy is operating as a remote-first
company with team members across the globe, from Asia to Europe to North America.

### Shape AppFlowy Together

In the near term, we are working on team collaboration and AppFlowy mobile. This will enable teams to seamlessly
collaborate in a centralized and secure workspace whenever, wherever. Want to be the first to experience it? Sign up for
the [private beta](https://survey.appflowy.io/private-beta?ref=blog.appflowy.io) program.

And it's still the very beginning of this journey—one that we hope you'll join us on as we work to shape AppFlowy
together. See
the [Contribution](https://docs.appflowy.io/docs/documentation/software-contributions/contributing-to-appflowy?ref=blog.appflowy.io)
page to learn more about ways to contribute!

Want to stay up to date on the latest from [AppFlowy](https://appflowy.io/?ref=blog.appflowy.io)? Follow us
on [Twitter](https://twitter.com/appflowy?ref=blog.appflowy.io)
and [Reddit](https://www.reddit.com/r/AppFlowy/?ref=blog.appflowy.io) and sign up for
our [newsletter](https://appflowy.io/subscribe-newsletter?ref=blog.appflowy.io).
```

### 3. Image Usage

```markdown
<Img src="/images/blog/tech-design-flutter-rust/img.png" alt="UI and Data Components" caption="UI and Data Components" />
```

### 4. Admonitions (Alerts) Usage

```markdown

<Admonition type='info' content="This article describes the technical design of
the [AppFlowy Editor](https://pub.dev/packages/appflowy_editor?ref=blog.appflowy.io).
" />

```

### 5. Caption Usage

```markdown

<Img src="/images/blog/tech-design-flutter-rust/img.png" alt="UI and Data Components" />

<Caption content="A highly customizable rich-text editor for Flutter" />

```