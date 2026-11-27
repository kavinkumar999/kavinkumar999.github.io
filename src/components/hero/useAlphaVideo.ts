"use client";
import { useEffect, useState, type RefObject } from "react";

export type AlphaState = "pending" | "ok" | "fallback";

const VERT = "attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}";
// The clip is colour | matte side by side. hx keeps bilinear taps off the seam between the two halves.
const FRAG =
  "precision mediump float;varying vec2 uv;uniform sampler2D tex;uniform float hx;" +
  "void main(){vec2 c=vec2(mix(hx,.5-hx,uv.x),uv.y);vec3 rgb=texture2D(tex,c).rgb;" +
  "float a=texture2D(tex,c+vec2(.5,0.)).r;gl_FragColor=vec4(rgb*a,a);}";

function shader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

/**
 * Composites a side-by-side (colour | matte) video onto a canvas, so the person is opaque and everything else is
 * transparent: the DOM behind the canvas (the big ghost name) shows through around them. The matte is per frame,
 * so the cut-out follows the person. CSS can't use a video as a mask, and blend modes can't tell a white shirt from
 * a white wall, hence WebGL. Returns "fallback" if WebGL is unavailable, so the caller can show the plain video.
 */
export function useAlphaVideo(videoRef: RefObject<HTMLVideoElement | null>, canvasRef: RefObject<HTMLCanvasElement | null>): AlphaState {
  const [state, setState] = useState<AlphaState>("pending");

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    const vs = gl && shader(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && shader(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl && vs && fs ? gl.createProgram() : null;
    if (!gl || !program || !vs || !fs) {
      setState("fallback");
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setState("fallback");
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const hx = gl.getUniformLocation(program, "hx");
    gl.clearColor(0, 0, 0, 0);

    let alive = true;
    let raf = 0;
    let last = -1;
    let shown = false;

    const draw = (): boolean => {
      if (video.readyState < 2 || !video.videoWidth) return false;
      gl.uniform1f(hx, 0.5 / video.videoWidth);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return true;
    };
    const tick = () => {
      if (!alive) return;
      // only upload a frame when the video's time moved (about 24 times a second while playing, never while paused)
      if (video.currentTime !== last) {
        try {
          if (draw()) {
            last = video.currentTime;
            if (!shown) {
              shown = true;
              setState("ok");
            }
          }
        } catch {
          alive = false;
          setState("fallback");
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      alive = false;
      setState("fallback");
    };
    canvas.addEventListener("webglcontextlost", onLost);
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [videoRef, canvasRef]);

  return state;
}
