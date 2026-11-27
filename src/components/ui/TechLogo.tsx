import type { ReactElement } from "react";
import { asset } from "@/lib/asset";

/** Brand logos: key -> file in /public/logos (devicon "original" SVGs, MIT; lnrs/srm supplied by owner). */
export const BRAND: Record<string, string> = {
  python: "/logos/python.svg", mysql: "/logos/mysql.svg", mongodb: "/logos/mongodb.svg", postgresql: "/logos/postgresql.svg",
  bash: "/logos/bash.svg", powershell: "/logos/powershell.svg", "github-actions": "/logos/github-actions.svg",
  jenkins: "/logos/jenkins.svg", svn: "/logos/svn.svg", "azure-devops": "/logos/azure-devops.svg", ansible: "/logos/ansible.svg",
  terraform: "/logos/terraform.svg", github: "/logos/github.svg", confluence: "/logos/confluence.svg", jira: "/logos/jira.svg",
  opentelemetry: "/logos/opentelemetry.svg", grafana: "/logos/grafana.svg", kibana: "/logos/kibana.svg",
  prometheus: "/logos/prometheus.svg", dynatrace: "/logos/dynatrace.svg", azure: "/logos/azure.svg", aws: "/logos/aws.svg",
  linux: "/logos/linux.svg", docker: "/logos/docker.svg", kubernetes: "/logos/kubernetes.svg", flask: "/logos/flask.svg",
  arduino: "/logos/arduino.svg", lnrs: "/logos/lnrs.webp", srm: "/logos/srm.webp",
  react: "/logos/react.svg", nextjs: "/logos/nextjs.svg", nodejs: "/logos/nodejs.svg", typescript: "/logos/typescript.svg",
  javascript: "/logos/javascript.svg", java: "/logos/java.svg", spring: "/logos/spring.svg", tailwindcss: "/logos/tailwindcss.svg",
  apachekafka: "/logos/apachekafka.svg",
  rust: "/logos/rust.svg", pytorch: "/logos/pytorch.svg", huggingface: "/logos/huggingface.svg", fastapi: "/logos/fastapi.svg",
  redis: "/logos/redis.svg", langchain: "/logos/langchain.svg", mlflow: "/logos/mlflow.svg",
  weightsandbiases: "/logos/weightsandbiases.svg", qdrant: "/logos/qdrant.svg",
};

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Thin line icons (48x48 viewBox, currentColor) for skills without an official logo. */
export const CONCEPT: Record<string, ReactElement> = {
  sql: (
    <g {...P}>
      <ellipse cx="24" cy="13" rx="13" ry="5" />
      <path d="M11 13v22c0 2.8 5.8 5 13 5s13-2.2 13-5V13" />
      <path d="M11 24c0 2.8 5.8 5 13 5s13-2.2 13-5" />
    </g>
  ),
  servicenow: (
    <g {...P}>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="6" />
      <path d="M24 9v9M24 30v9M9 24h9M30 24h9" />
    </g>
  ),
  medal: (
    <g {...P}>
      <path d="M16 5l6 13M32 5l-6 13" />
      <circle cx="24" cy="29" r="12" />
      <path d="M24 23l2 4 4.4.6-3.2 3 .8 4.4L24 33l-4 2 .8-4.4-3.2-3 4.4-.6z" />
    </g>
  ),
  gitsvn: (
    <g {...P}>
      <circle cx="14" cy="10" r="4" /><circle cx="14" cy="38" r="4" /><circle cx="34" cy="20" r="4" />
      <path d="M14 14v20M34 24c0 6-6 8-20 10" />
    </g>
  ),
  gitleaks: (
    <g {...P}>
      <circle cx="17" cy="24" r="8" /><path d="M25 24h16M35 24v6M41 24v4" />
      <path d="M8 40L40 8" />
    </g>
  ),
  trufflehog: (
    <g {...P}>
      <circle cx="21" cy="21" r="11" /><path d="M29 29l11 11" />
      <path d="M16 21h10M21 16v10" />
    </g>
  ),
  githubapi: (
    <g {...P}>
      <path d="M17 12l-9 12 9 12M31 12l9 12-9 12" /><path d="M27 10l-6 28" />
    </g>
  ),
  chip: (
    <g {...P}>
      <rect x="13" y="13" width="22" height="22" rx="3" />
      <rect x="19" y="19" width="10" height="10" rx="1.5" />
      <path d="M19 7v6M29 7v6M19 35v6M29 35v6M7 19h6M7 29h6M35 19h6M35 29h6" />
    </g>
  ),
  llamaindex: (
    <g {...P}>
      <path d="M24 8l16 8-16 8-16-8z" />
      <path d="M8 24l16 8 16-8M8 32l16 8 16-8" />
    </g>
  ),
  rag: (
    <g {...P}>
      <path d="M13 6h15l8 8v10M13 6v36h11M28 6v8h8" />
      <path d="M19 22h10M19 28h5" />
      <circle cx="33" cy="35" r="6" /><path d="M37.5 39.5L42 44" />
    </g>
  ),
  agents: (
    <g {...P}>
      <rect x="11" y="17" width="26" height="20" rx="4" />
      <path d="M24 17v-6" /><circle cx="24" cy="8" r="2.5" />
      <circle cx="18" cy="26" r="1.6" /><circle cx="30" cy="26" r="1.6" />
      <path d="M19 32h10M6 24v6M42 24v6" />
    </g>
  ),
  evals: (
    <g {...P}>
      <rect x="10" y="9" width="28" height="34" rx="3" />
      <path d="M18 9V6h12v3" />
      <path d="M16 21l2.5 2.5L23 19M27 21h6M16 33l2.5 2.5L23 31M27 33h6" />
    </g>
  ),
};

export function isBrand(name: string): boolean {
  return name in BRAND;
}

interface Props {
  /** Logo key from data.ts (brand or concept). */
  name: string;
  /** Pixel size (square). Default 40. */
  size?: number;
  /** Accessible label. Omit when the logo is decorative (a visible name sits beside it). */
  label?: string;
  className?: string;
}

export default function TechLogo({ name, size = 40, label, className = "" }: Props) {
  if (isBrand(name)) {
    return (
      <img
        src={asset(BRAND[name])}
        alt={label ?? ""}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={className}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {CONCEPT[name] ?? CONCEPT.chip}
    </svg>
  );
}
