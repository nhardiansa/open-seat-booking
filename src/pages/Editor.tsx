import { Pencil, Grid3x3 } from 'lucide-react';

export default function Editor() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Pencil className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Layout Editor</h1>
              <p className="text-sm text-muted-foreground">Desain layout tempat duduk Anda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-12">
          <div className="text-center">
            <Grid3x3 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Canvas Editor Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Area ini akan menampilkan canvas editor dengan Konva.js untuk membuat dan mengedit layout tempat duduk secara interaktif.
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
          <FeatureItem title="Drag & Drop" description="Pindahkan objek dengan mudah" />
          <FeatureItem title="Shapes & Text" description="Tambahkan berbagai bentuk dan teks" />
          <FeatureItem title="Save & Export" description="Simpan dan ekspor layout Anda" />
        </div>
      </div>
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
