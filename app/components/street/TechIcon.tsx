"use client"

import type { IconType } from "react-icons"
import { DiMsqlServer } from "react-icons/di"
import { TbTerminal2 } from "react-icons/tb"
import {
  SiDocker,
  SiDotnet,
  SiGit,
  SiGithubactions,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"

/**
 * Local SVG brand marks. The previous implementation pulled PNGs from
 * skillicons.dev on every render — a third-party request per icon, no offline
 * support and a fixed light-theme palette. These inherit currentColor instead.
 */
const ICONS: Record<string, IconType> = {
  "c#": SiSharp,
  csharp: SiSharp,
  typescript: SiTypescript,
  ts: SiTypescript,
  react: SiReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  "asp.net core": SiDotnet,
  "asp.net": SiDotnet,
  ".net": SiDotnet,
  dotnet: SiDotnet,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  nestjs: SiNestjs,
  nest: SiNestjs,
  "tailwind css": SiTailwindcss,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  "sql server": DiMsqlServer,
  mssql: DiMsqlServer,
  sql: DiMsqlServer,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  redis: SiRedis,
  docker: SiDocker,
  "ci/cd": SiGithubactions,
  cicd: SiGithubactions,
  nginx: SiNginx,
  git: SiGit,
}

export default function TechIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string
  className?: string
}) {
  const Icon = ICONS[name.toLowerCase().trim()] ?? TbTerminal2
  return <Icon className={className} aria-hidden />
}
