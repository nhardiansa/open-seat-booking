import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/types/routes';
import { Calendar, Layout, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <title>Home - Open Seat Booking</title>
      <div className="min-h-[calc(100vh-4rem)]">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Seat Booking Manager
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Kelola dan organisir tempat duduk dengan mudah. Buat layout tempat duduk custom dan kelola booking dengan efisien.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={APP_ROUTES.EDITOR}
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Mulai Edit Layout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={APP_ROUTES.ORGANIZER}
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                Kelola Booking <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Layout className="h-8 w-8" />}
                title="Editor Layout"
                description="Desain layout tempat duduk dengan drag & drop. Customize sesuai kebutuhan event Anda."
                link={APP_ROUTES.EDITOR}
              />
              <FeatureCard
                icon={<Calendar className="h-8 w-8" />}
                title="Organizer Booking"
                description="Kelola booking dan reservasi dengan mudah. Track status dan availabilitas secara real-time."
                link={APP_ROUTES.ORGANIZER}
              />
              <FeatureCard
                icon={<div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3D</div>}
                title="Visualisasi Interaktif"
                description="Lihat dan kelola layout dalam canvas interaktif dengan teknologi Konva.js."
              />
            </div>
          </div>
        </section>
      </div>
    </>

  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  const content = (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/50">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
