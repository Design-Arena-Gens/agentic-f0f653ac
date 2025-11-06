import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { monuments } from "@/lib/monuments";
import Link from "next/link";

const MonumentCanvas = dynamic(() => import("@/components/MonumentCanvas"), { ssr: false });

export function generateStaticParams() {
  return monuments.map((m) => ({ slug: m.slug }));
}

export default function MonumentPage({ params }: { params: { slug: string } }) {
  const monument = monuments.find((m) => m.slug === params.slug);
  if (!monument) return notFound();

  return (
    <main>
      <div className="container">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:16}}>
          <div>
            <h1 className="neon-text" style={{marginBottom:6}}>{monument.name}</h1>
            <div className="card-sub">{monument.location}</div>
          </div>
          <Link className="button" href="/">Back to Grid</Link>
        </div>

        <div className="hero" style={{marginTop:16}}>
          <MonumentCanvas slug={monument.slug} height={520} quality="high" />
        </div>

        <p style={{maxWidth:840, lineHeight:1.7}}>{monument.summary}</p>
      </div>
    </main>
  );
}
