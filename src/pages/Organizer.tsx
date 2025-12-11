import { Calendar, Users, Clock } from 'lucide-react';

export default function Organizer() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Booking Organizer</h1>
              <p className="text-sm text-muted-foreground">Kelola reservasi dan booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            title="Total Bookings"
            value="0"
            description="Total reservasi aktif"
          />
          <StatCard
            icon={<Calendar className="h-5 w-5" />}
            title="Events"
            value="0"
            description="Event yang dijadwalkan"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            title="Pending"
            value="0"
            description="Menunggu konfirmasi"
          />
        </div>

        {/* Placeholder Content */}
        <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-12">
          <div className="text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Booking Management Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Area ini akan menampilkan daftar booking, status reservasi, dan tools untuk mengelola booking tempat duduk.
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                In Development
              </div>
            </div>
          </div>
        </div>

        {/* Future Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureItem title="Real-time Updates" description="Update status booking secara real-time" />
          <FeatureItem title="Filter & Search" description="Cari dan filter booking dengan mudah" />
          <FeatureItem title="Export Reports" description="Ekspor laporan booking" />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
