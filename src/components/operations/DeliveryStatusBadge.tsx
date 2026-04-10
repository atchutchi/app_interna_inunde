import * as React from "react";
import { CheckCircle2, XCircle, Clock, Truck, Package, RotateCcw, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { DELIVERY_STATUSES } from "@/lib/constants";
import type { DeliveryStatus } from "@/types/app.types";

const STATUS_ICONS: Record<DeliveryStatus, React.ElementType> = {
  received: Clock,
  preparing: Package,
  assigned: Clock,
  in_route: Truck,
  completed: CheckCircle2,
  failed: XCircle,
  cancelled: Ban,
  refunded: RotateCcw,
};

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus;
  className?: string;
}

export function DeliveryStatusBadge({ status, className }: DeliveryStatusBadgeProps) {
  const config = DELIVERY_STATUSES[status];
  const Icon = STATUS_ICONS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold animate-in fade-in-0 zoom-in-95",
        config.color,
        config.bgColor,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
