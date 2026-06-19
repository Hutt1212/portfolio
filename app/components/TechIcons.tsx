"use client"

import React from "react"
import { TbTerminal } from "react-icons/tb"

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string
  className?: string
}

export default function TechIcon({ name, className, ...props }: IconProps) {
  const cleanName = name.toLowerCase().trim()
  const defaultClass = className || "w-6 h-6"

  const skillIconsMap: Record<string, string> = {
    "c#": "cs",
    "csharp": "cs",
    "typescript": "ts",
    "ts": "ts",
    "react": "react",
    "next.js": "nextjs",
    "nextjs": "nextjs",
    "asp.net core": "dotnet",
    "asp.net": "dotnet",
    ".net": "dotnet",
    "node.js": "nodejs",
    "nodejs": "nodejs",
    "node": "nodejs",
    "nestjs": "nestjs",
    "nest": "nestjs",
    "tailwind css": "tailwind",
    "tailwindcss": "tailwind",
    "tailwind": "tailwind",
    "postgresql": "postgres",
    "postgres": "postgres",
    "mongodb": "mongodb",
    "mongo": "mongodb",
    "redis": "redis",
    "docker": "docker",
    "ci/cd": "githubactions",
    "cicd": "githubactions",
    "nginx": "nginx",
    "git": "git",
  }

  const mappedIcon = skillIconsMap[cleanName]

  if (!mappedIcon) {
    if (cleanName === "sql server" || cleanName === "sql" || cleanName === "mssql") {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={defaultClass} {...(props as any)}>
          <path d="M19 12c0 2.2-3.1 4-7 4s-7-1.8-7-4 3.1-4 7-4 7 1.8 7 4zm0 4c0 2.2-3.1 4-7 4s-7-1.8-7-4v2c0 2.2 3.1 4 7 4s7-1.8 7-4v-2zm0-8c0 2.2-3.1 4-7 4S5 10.2 5 8v2c0 2.2 3.1 4 7 4s7-1.8 7-4V8zM12 2C8.1 2 5 3.8 5 6s3.1 4 7 4 7-1.8 7-4-3.1-4-7-4z" />
        </svg>
      )
    }
    return <TbTerminal className={defaultClass} />
  }

  return (
    <img 
      src={`https://skillicons.dev/icons?i=${mappedIcon}&theme=light`} 
      alt={name}
      className={defaultClass}
      {...(props as any)}
    />
  )
}
