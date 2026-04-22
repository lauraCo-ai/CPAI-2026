"use client";

import { componentsRegistry } from "@/lib/components-registry";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ComponentsIndexPage() {
  return (
    <div className="mx-auto max-w-7xl container-px py-10">
      {/* Header */}
      <div className="mb-10 space-y-2">
        <h1 className="heading-md">Components</h1>
        <p className="text-muted-foreground">
          Here you can find all the components available in the library. We are
          working on adding more components.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {componentsRegistry.map((component) => (
          <Link key={component.slug} href={`/design-system/${component.slug}`}>
            <Card className="rounded-xl shadow-none hover:border-primary/50 transition-colors h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  {component.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {component.description}
                </p>
              </CardContent>
              <CardFooter>
                {component.installed ? (
                  <Badge variant="secondary">Installed</Badge>
                ) : (
                  <Badge variant="outline">Composite</Badge>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
