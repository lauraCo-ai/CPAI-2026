"use client";

import { notFound } from "next/navigation";
import { componentsRegistry } from "@/lib/components-registry";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { ComponentDemo } from "@/components/component-demos";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ComponentPage({ params }: PageProps) {
  const { slug } = use(params);
  const component = componentsRegistry.find((c) => c.slug === slug);
  if (!component) notFound();

  return (
    <div className="mx-auto max-w-4xl container-px py-10 space-y-8">
      {/* Back */}
      <Link
        href="/design-system"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Components
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="heading-md">{component.name}</h1>
          <Badge variant={component.installed ? "secondary" : "outline"}>
            {component.installed ? "Installed" : "Composite"}
          </Badge>
        </div>
        <p className="text-muted-foreground">{component.description}</p>
        <Button variant="outline" size="sm" asChild>
          <a
            href={component.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            View docs
          </a>
        </Button>
      </div>

      {/* Demo */}
      <div className="rounded-xl border border-border p-6 md:p-10">
        <ComponentDemo slug={slug} />
      </div>
    </div>
  );
}
