import Link from "next/link";
import { monuments } from "@/lib/monuments";
import dynamic from "next/dynamic";

const NeonBackground = dynamic(() => import("@/components/NeonBackground"), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <NeonBackground />
      <div className="container">
        <section className="hero scanlines" style={{position:'relative', height: 360}}>
          <div className="hero-overlay" />
          <div style={{position:'absolute', inset:0, padding:24, display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:12}}>
            <h1 className="neon-text" style={{fontSize:40, margin:0}}>Neon Monuments 2077</h1>
            <p style={{maxWidth:720, opacity:.9}}>Explore iconic landmarks reimagined in a cyberpunk future. Dive into interactive 3D scenes drenched in neon, bloom, and synth atmospherics.</p>
            <div style={{display:'flex', gap:12, marginTop:6}}>
              <a href="#grid" className="button">Browse Monuments</a>
              <Link className="button" href="/monument/eiffel-tower">Random Start</Link>
            </div>
          </div>
        </section>

        <section id="grid" className="grid">
          {monuments.map((m) => (
            <Link key={m.slug} href={`/monument/${m.slug}`} className="card">
              <div style={{height:140, background:"linear-gradient(90deg, rgba(168,85,247,.25), rgba(0,229,255,.2))", borderRadius:10, border:"1px solid rgba(255,255,255,.08)"}} />
              <div>
                <div className="card-title">{m.name}</div>
                <div className="card-sub">{m.location}</div>
              </div>
            </Link>
          ))}
        </section>

        <div className="footer">Made with Next.js + React Three Fiber</div>
      </div>
    </main>
  );
}
