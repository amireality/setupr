import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento transition-all duration-300 p-5 bg-[#0c0d12]/70 hover:bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.18] justify-between flex flex-col space-y-4 overflow-hidden hover:-translate-y-1",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-display font-bold text-foreground mb-2 mt-2">
          {title}
        </div>
        <div className="font-body text-muted-foreground text-sm">
          {description}
        </div>
      </div>
    </div>
  );
};
