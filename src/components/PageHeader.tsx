import React from "react";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  title: string;
  highlightedTitle?: string;
  subtitle: string;
  season?: string | number;
  week?: number;
  round?: string;
  actions?: React.ReactNode;
}

const PageHeader = ({
  title,
  highlightedTitle,
  subtitle,
  season,
  week,
  round,
  actions
}: PageHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-955/40 backdrop-blur-md border border-slate-200 dark:border-white/5 p-8 md:p-12 text-slate-900 dark:text-white shadow-lg dark:shadow-2xl mb-12">
      {/* Premium ambient glows */}
      <div className="absolute top-0 right-1/4 -mt-24 h-48 w-96 rounded-full bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-24 h-48 w-96 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 blur-3xl opacity-40 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-3.5 max-w-3xl flex-1">
          {/* Metadata badges (clean, no icons) */}
          {(season !== undefined || week !== undefined || round !== undefined) && (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              {season !== undefined && (
                <Badge variant="outline" className="text-xs px-3.5 py-1 bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-extrabold uppercase tracking-wider">
                  Season {season}
                </Badge>
              )}
              {week !== undefined && (
                <Badge className="text-xs px-3.5 py-1 bg-gradient-to-r from-primary to-emerald-600 border-0 text-white font-extrabold uppercase tracking-wider">
                  Week {week}
                </Badge>
              )}
              {round && (
                <Badge className="text-xs px-3.5 py-1 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider">
                  {round}
                </Badge>
              )}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {title} {highlightedTitle && (
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {highlightedTitle}
              </span>
            )}
          </h1>
          
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center justify-center gap-3 md:self-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
