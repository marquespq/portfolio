import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "../../utils/motion";

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aScale;
  varying float vForce;
  varying float vWave;

  void main() {
    vec3 pos = position;

    float wave = sin(uTime * 0.5 + position.x * 0.45 + position.y * 0.35);
    pos.z += wave * 0.6;

    vec2 toMouse = pos.xy - uMouse;
    float dist = length(toMouse);
    float force = smoothstep(3.0, 0.0, dist);
    pos.xy += normalize(toMouse + vec2(0.0001)) * force * 1.2;
    pos.z += force * 1.5;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * (26.0 / -mv.z) * (1.0 + force * 1.5);

    vForce = force;
    vWave = wave;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vForce;
  varying float vWave;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float circle = smoothstep(0.5, 0.1, d);
    vec3 color = mix(uBase, uAccent, clamp(vForce * 1.4, 0.0, 1.0));
    float alpha = circle * (0.30 + 0.25 * vWave + 0.5 * vForce);
    gl_FragColor = vec4(color, alpha);
  }
`;

function Particles({ count, animate }: { count: number; animate: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const pointerNdc = useRef(new THREE.Vector2(10, 10));
  const mouseWorld = useRef(new THREE.Vector2(50, 50));

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      scales[i] = 0.5 + Math.random();
    }
    return { positions, scales };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(50, 50) },
      uBase: { value: new THREE.Color("#6d675e") },
      uAccent: { value: new THREE.Color("#e98a3c") },
    }),
    [],
  );

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointerNdc.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;
    if (animate) material.uniforms.uTime.value += Math.min(delta, 0.05);

    const targetX = (pointerNdc.current.x * viewport.width) / 2;
    const targetY = (pointerNdc.current.y * viewport.height) / 2;
    mouseWorld.current.x += (targetX - mouseWorld.current.x) * 0.06;
    mouseWorld.current.y += (targetY - mouseWorld.current.y) * 0.06;
    material.uniforms.uMouse.value.copy(mouseWorld.current);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
      />
    </points>
  );
}

export default function Background3D() {
  const dense = window.innerWidth >= 768;
  const animate = !prefersReducedMotion();

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <Particles count={dense ? 3200 : 1400} animate={animate} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0d0b09_100%)]" />
    </div>
  );
}
