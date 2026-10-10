import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import portraitMask from "@/assets/images/portrait-mask.webp";
import Colophon from "@/components/Colophon";
import ControlButton from "@/components/ControlButton";
import DataTable, { type DataTableColumn } from "@/components/DataTable";
import Entry from "@/components/Entry";
import ExternalLink from "@/components/ExternalLink";
import InlineList from "@/components/InlineList";
import Portrait from "@/components/Portrait";
import Prose from "@/components/Prose";
import Rule from "@/components/Rule";
import { SpecItem, SpecList } from "@/components/SpecList";
import SpecSection from "@/components/SpecSection";
import SpecSubsection from "@/components/SpecSubsection";
import Text from "@/components/Text";
import WebUiAgentFlow from "@/components/WebUiAgentFlow";
import WithFigure from "@/components/WithFigure";
import { jobs, moreProjects, pins } from "@/config";
import { formatCommitTime, type Commit } from "@/lib/github/commitLog";
import { getCommitLog } from "@/lib/github/queries";
import { getAllPosts } from "@/lib/study";
import { SiteHeader } from "@/partials/SiteHeader";

export const Route = createFileRoute("/")({
  loader: async () => ({ posts: await getAllPosts() }),
  component: HomePage
});

const commitColumns: DataTableColumn<Commit>[] = [
  {
    key: "when",
    header: "When",
    nowrap: true,
    muted: true,
    cell: commit => formatCommitTime(commit.date)
  },
  {
    key: "repo",
    header: "Repo",
    nowrap: true,
    cell: commit => commit.repo.split("/")[1]
  },
  {
    key: "sha",
    header: "Commit",
    nowrap: true,
    hideOnNarrow: true,
    cell: commit => <a href={commit.url}>{commit.sha}</a>
  },
  {
    key: "message",
    header: "Message",
    ownLineOnNarrow: true,
    truncate: true,
    cell: commit => <span title={commit.message}>{commit.message}</span>
  }
];

function HomePage() {
  const { posts } = Route.useLoaderData();
  const commitLog = useQuery(getCommitLog());
  const log = commitLog.data?.status === "ok" ? commitLog.data.log : null;
  const isLogUnavailable = commitLog.isError || commitLog.data?.status === "error";

  return (
    <>
      <SiteHeader
        meta={["Landshut, DE", `Rev ${__BUILD_DATE__}`]}
        title={["Personal spec sheet"]}
      />

      <SpecSection id="ident" number="01" title="Ident">
        <WithFigure
          figure={
            <Portrait mask={portraitMask} label="Pencil sketch of Nik Brunner" />
          }
        >
          <SpecList>
            <SpecItem label="Name">Nikolaus Brunner, Nik for short</SpecItem>
            <SpecItem label="Role">Design Engineer</SpecItem>
            <SpecItem label="Base">Landshut, Bavaria, DE</SpecItem>
            <SpecItem label="Born">1984</SpecItem>
            <SpecItem label="Code">
              Self-taught 2019, professional since 2020
            </SpecItem>
            <SpecItem label="Languages">German (native), English (fluent)</SpecItem>
          </SpecList>
          <SpecList>
            <SpecItem label="Mail">
              <a href="mailto:nik@nbr.haus">nik@nbr.haus</a>
            </SpecItem>
            <SpecItem label="Elsewhere">
              <InlineList>
                <ExternalLink href="https://github.com/nikbrunner">
                  GitHub
                </ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/nbru/">
                  LinkedIn
                </ExternalLink>
                <ExternalLink href="https://www.instagram.com/nikolaus.brunner">
                  Instagram
                </ExternalLink>
              </InlineList>
            </SpecItem>
            <SpecItem label="CV" hideInPrint>
              <InlineList>
                <span>This page. It prints as one.</span>
                <ControlButton onClick={() => globalThis.print()}>
                  Print
                </ControlButton>
              </InlineList>
            </SpecItem>
          </SpecList>
        </WithFigure>
      </SpecSection>

      <SpecSection id="about" number="02" title="About">
        <Prose>
          <p>
            I build frontend architecture and design systems, and I care about UX and
            DX in equal measure. I like working closely with designers, and I&apos;m
            happy to make the design call myself when nobody else does.
          </p>
          <p>
            I genuinely love building and using products. I&apos;m the person who
            writes to support about a bug and reads changelogs and release notes for
            fun.
          </p>
          <p>
            Away from the desk: hiking, running, bouldering, cooking, reading,
            photography. Design in every form, from architecture to type. And a
            slight keyboard obsession.
          </p>
        </Prose>
      </SpecSection>

      <SpecSection id="work" number="03" title="Work">
        <Entry aside={<Text caps>Now</Text>}>
          <Text caps bold>
            <a href="https://www.imfusion.com/">ImFusion</a>, Web &amp; Cloud team
          </Text>
          <Text muted>Senior Design Engineer, since 2026-04</Text>
        </Entry>
        <Entry aside={null}>
          <Prose>
            <p>
              I&apos;m building{" "}
              <ExternalLink href="https://www.npmjs.com/package/@imfusion/web-ui">
                @imfusion/web-ui
              </ExternalLink>
              , ImFusion&apos;s React component library on top of Base UI, with its
              design tokens, icons and tooling.
            </p>
            <p>
              The library is built to be set up and used through a coding agent.
              Agents don&apos;t read about it, they get routed through it.
            </p>
          </Prose>
        </Entry>
        <Entry aside={null}>
          <WebUiAgentFlow />
        </Entry>
        <Rule dashed />
        <SpecList>
          <SpecItem label="Evals">
            Agents run against consumer scenarios to check they pick the right skill
            and follow the conventions.
          </SpecItem>
          <SpecItem label="Install">
            A CLI installs the skills into the shared .agents/skills folder, links
            them for agents that don&apos;t read it yet, wires up the hooks and keeps
            the project&apos;s AGENTS.md block current.
          </SpecItem>
          <SpecItem label="Stack">
            React, TypeScript, Base UI, Storybook, Vitest, Playwright
          </SpecItem>
        </SpecList>

        <SpecSubsection number="03.1" title="Before">
          {jobs.map(job => (
            <Entry
              key={job.company}
              aside={
                <>
                  {job.period[0]}
                  <br />
                  {job.period[1]}
                </>
              }
            >
              <Text caps bold>
                <ExternalLink href={job.href}>{job.company}</ExternalLink>
              </Text>
              <Text muted>{job.role}</Text>
              <Text spaced>{job.notes}</Text>
            </Entry>
          ))}
        </SpecSubsection>
      </SpecSection>

      <SpecSection id="projects" number="04" title="Projects">
        <SpecSubsection number="04.1" title="Pinned">
          {pins.map(pin => (
            <Entry
              key={pin.repo}
              aside={
                <Text caps bold>
                  <ExternalLink href={pin.href}>{pin.name}</ExternalLink>
                </Text>
              }
            >
              <span>{pin.description}</span>
              <Text muted>
                <Text caps>Stack</Text> {pin.stack}. <Text caps>Last commit</Text>{" "}
                {log?.lastCommitByRepo[pin.repo]?.slice(0, 10) ?? "-"}
              </Text>
            </Entry>
          ))}
          <Rule dashed />
          <SpecList>
            <SpecItem label="Also">
              <InlineList>
                {moreProjects.map(project => (
                  <ExternalLink key={project.name} href={project.href}>
                    {project.name}
                  </ExternalLink>
                ))}
              </InlineList>
            </SpecItem>
          </SpecList>
        </SpecSubsection>

        <SpecSubsection
          number="04.2"
          title="Log"
          note="Latest public commits, GitHub"
        >
          <DataTable
            caption="Latest public commits"
            columns={commitColumns}
            rows={log?.commits ?? []}
            getRowKey={commit => `${commit.repo}/${commit.sha}`}
            placeholder={
              isLogUnavailable ? (
                <>
                  Log unavailable, see{" "}
                  <ExternalLink href="https://github.com/nikbrunner">
                    GitHub
                  </ExternalLink>
                </>
              ) : (
                "Loading commits"
              )
            }
          />
        </SpecSubsection>
      </SpecSection>

      <SpecSection id="how-i-work" number="05" title="How I work">
        <Prose>
          <p>
            I set my own priorities and manage my own work, and I know when to reach
            out for input. A good team working towards a shared goal is what I enjoy
            most.
          </p>
          <p>
            I care a lot about workflow. Almost everything I do runs through the
            terminal and the keyboard, and I keep tuning that setup the way other
            people tune a bike.
          </p>
        </Prose>

        <SpecSubsection number="05.1" title="Agents">
          <Prose>
            <p>
              I build my own agent tooling, for my own workflow and for the people
              using my libraries. I stay the reviewer: agents propose, I read every
              diff.
            </p>
            <p>
              I learned to code before LLMs, and I think juniors should still learn
              that way first.
            </p>
          </Prose>
        </SpecSubsection>

        <SpecSubsection number="05.2" title="Tooling">
          <SpecList>
            <SpecItem label="Terminal">
              <ExternalLink href="https://ghostty.org">Ghostty</ExternalLink>
            </SpecItem>
            <SpecItem label="Workspace">
              <ExternalLink href="https://herdr.dev">herdr</ExternalLink>, with
              agents, shells and tools side by side. I move between workspaces with{" "}
              <ExternalLink href="https://github.com/black-atom-industries/helm.herdr">
                Helm
              </ExternalLink>
              , my navigator for it.
            </SpecItem>
            <SpecItem label="Editor">
              <ExternalLink href="https://neovim.io">Neovim</ExternalLink>
            </SpecItem>
            <SpecItem label="Agents">
              <InlineList>
                <ExternalLink href="https://claude.com/product/claude-code">
                  Claude Code
                </ExternalLink>
                <ExternalLink href="https://github.com/mariozechner/pi-coding-agent">
                  Pi
                </ExternalLink>
              </InlineList>
            </SpecItem>
            <SpecItem label="Review">
              <ExternalLink href="https://tuicr.dev">tuicr</ExternalLink>, for
              reading diffs in the terminal
            </SpecItem>
            <SpecItem label="Git">
              <ExternalLink href="https://github.com/jesseduffield/lazygit">
                LazyGit
              </ExternalLink>
            </SpecItem>
            <SpecItem label="Popups">
              <InlineList>
                <ExternalLink href="https://github.com/jesseduffield/lazydocker">
                  lazydocker
                </ExternalLink>
                <ExternalLink href="https://github.com/nikbrunner/lazyjira">
                  lazyjira
                </ExternalLink>
                <ExternalLink href="https://github.com/nikbrunner/bm">
                  bm
                </ExternalLink>
                <ExternalLink href="https://black-atom.industries/">
                  Livery
                </ExternalLink>
              </InlineList>
            </SpecItem>
            <SpecItem label="Config">
              All of it lives in{" "}
              <ExternalLink href="https://github.com/nikbrunner/dots">
                dots
              </ExternalLink>
              , my agent skills included.
            </SpecItem>
          </SpecList>
        </SpecSubsection>
      </SpecSection>

      <SpecSection
        number="06"
        title="Study"
        note={
          <span className="no-print">
            <Link to="/study">All posts</Link>
          </span>
        }
      >
        {posts.map(post => (
          <Entry key={post.slug} aside={post.frontmatter.publishedAt}>
            <Text caps bold>
              <Link to="/study/$slug" params={{ slug: post.slug }}>
                {post.frontmatter.title}
              </Link>
            </Text>
            <Text muted>{post.frontmatter.excerpt}</Text>
          </Entry>
        ))}
      </SpecSection>

      <Colophon start="nbr.haus" center="Design via function" end="Page 1 / 1" />
    </>
  );
}
