import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  Info,
  Phone,
  Briefcase,
  Wrench,
  ExternalLink,
  Pencil,
} from "lucide-react";

interface PageInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

const PAGES: PageInfo[] = [
  {
    id: "home",
    name: "Home",
    description: "Hero, Trust Stats, Service Bundles, FAQ, and CTA",
    icon: Home,
    path: "/",
  },
  {
    id: "about",
    name: "About",
    description: "Company story, mission, team overview",
    icon: Info,
    path: "/about",
  },
  {
    id: "contact",
    name: "Contact",
    description: "Contact form, office info, and map",
    icon: Phone,
    path: "/contact",
  },
  {
    id: "career",
    name: "Career / Fellowship",
    description: "Fellowship program and application form",
    icon: Briefcase,
    path: "/career",
  },
  {
    id: "services",
    name: "Services Overview",
    description: "Service categories, search, and bundles",
    icon: Wrench,
    path: "/services",
  },
];

export const VisualPageList: React.FC = () => {
  const handleEditPage = (page: PageInfo) => {
    // Open the page in a new tab with edit mode query parameter
    window.open(`${page.path}?editMode=true`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pencil className="w-5 h-5 text-primary" />
          Visual Page Editor
        </CardTitle>
        <CardDescription>
          Click "Edit Content" to open the page in a new tab with edit mode enabled. 
          Make changes directly on the live page layout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PAGES.map((page) => {
            const Icon = page.icon;

            return (
              <div
                key={page.id}
                className="group glass-card glass-card-hover rounded-xl p-5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <Link
                    to={page.path}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="View live page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {page.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {page.description}
                </p>

                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleEditPage(page)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Edit Content
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualPageList;
