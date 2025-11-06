"use client";
import { useEffect, useRef } from "react";

export default function NeonBackground(){
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!; const ctx = canvas.getContext('2d')!;
    let raf = 0; const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; };
    const draw = (t:number) => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      for(let i=0;i<18;i++){
        const hue = (t*0.02 + i*20)%360;
        ctx.strokeStyle = `hsla(${hue}, 90%, 60%, 0.08)`;
        ctx.lineWidth = 1.5 * dpr;
        const y = (i/18)*canvas.height + Math.sin(t*0.001 + i)*12*dpr;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for(let x=0;x<canvas.width;x+=40*dpr){
          const ny = y + Math.sin((x+t*0.2)/220 + i)*10*dpr;
          ctx.lineTo(x, ny);
        }
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(() => draw(t+16));
    };
    resize(); draw(0);
    addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
  },[]);
  return <canvas ref={ref} style={{position:'fixed', inset:0, zIndex:0, opacity:.5, pointerEvents:'none'}} />
}
