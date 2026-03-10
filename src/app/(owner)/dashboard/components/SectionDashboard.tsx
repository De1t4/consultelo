"use client";

import { getPublicConsultationsAction, getUserStatsAction } from "@/features/consultations";
import { Button } from "@/components/ui/Button";
import { CardDashboard } from "@/components/ui/CardConsult/Card";
import StatCard from "@/components/ui/StatCard";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  Folder,
  MessageSquare,
  Plus
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SectionDashboard() {
  const { data: session } = useSession();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await getUserStatsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!session,
  });

  const { data: publicConsultations, isLoading: consultationsLoading } = useQuery({
    queryKey: ["public-consultations"],
    queryFn: async () => {
      const res = await getPublicConsultationsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-2xl">
        <p className="text-xl font-semibold mb-4 text-muted-foreground">You are not logged in</p>
        <Link href="/account?auth=login">
          <Button variant="outline">Login to See Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex justify-between items-center border-b border-border pb-6 max-md:flex-col gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground max-md:text-center">Dashboard Overview</h1>
          <p className="text-muted-foreground text-md mt-1 font-medium max-md:text-center">
            Welcome back, <span className="text-primary font-bold">{session.user.name?.split(' ')[0]}</span>
          </p>
        </div>
        <Link href="/consultation">
          <Button className="flex h-12 items-center gap-2 rounded-xl px-5 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">
            <Plus className="size-5" />
            <span className=" sm:inline">New Consultation</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={<Folder className="size-6 text-primary" />}
          label="Active Consultations"
          value={stats?.activeConsultations ?? 0}
          trend="+16%"
          isLoading={statsLoading}
        />
        <StatCard
          icon={<MessageSquare className="size-6 text-blue-500" />}
          label="Total Responses"
          value={stats?.totalResponses ?? 0}
          trend="30 Days"
          isLoading={statsLoading}
        />
        {/* <StatCard
          icon={<TrendingUp className="size-6 text-amber-500" />}
          label="Community Impact"
          value={stats?.communityImpact ?? "Top 10%"}
          badge="Elite Solver"
          isLoading={statsLoading}
        /> */}
      </div>

      {/* Recent Public Inquiries Header */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl tracking-tight text-foreground font-bold mb-2">Public Consultations</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors cursor-pointer">
            <ChevronDown className="size-4" />
            Category
          </button>
        </div>
      </div>

      {/* Inquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {consultationsLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[200px] bg-card/50 animate-pulse rounded-2xl border border-border" />
          ))
        ) : (
          publicConsultations?.map((consultation) => (
            <CardDashboard key={consultation.id} consultation={consultation} />
          ))
        )}
      </div>

      {publicConsultations && publicConsultations.length === 0 && !consultationsLoading && (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl">
          <p className="text-muted-foreground text-lg">No public inquiries found. Why not be the first?</p>
          <Link href="/consultation">
            <Button variant="outline" className="mt-4">Create One</Button>
          </Link>
        </div>
      )}
    </div>
  );
}


