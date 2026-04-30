import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"radius":100,"ballSize":35,"speed":0.6,"density":2}), []);
  const addControl = (id, l, min, max, val) => {
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = () => {};
  const annotate = () => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    if(material.uniforms && material.uniforms.uTime) {
         material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const sphereCount = 5;
        const radius = addControl("radius", "Orbital Radius", 50, 150, 100);
        const ballSize = addControl("ballSize", "Ball Size", 10, 60, 35);
        const speed = addControl("speed", "Motion Speed", 0.1, 2.0, 0.6);
        const density = addControl("density", "Density", 1, 5, 2);
        
        // 计算每个球分配的粒子
        const pPerBall = Math.floor(count / sphereCount);
        const ballId = Math.floor(i / pPerBall) % sphereCount;
        const localId = i % pPerBall;
        
        // 1. 生成基础球体形状 (Fibonacci Lattice)
        const phi = Math.acos(-1 + (2 * localId) / pPerBall);
        const theta = Math.sqrt(pPerBall * Math.PI) * phi;
        const lx = Math.cos(theta) * Math.sin(phi) * ballSize;
        const ly = Math.sin(theta) * Math.sin(phi) * ballSize;
        const lz = Math.cos(phi) * ballSize;
        
        // 2. 计算五个球各自的“轨道中心”
        // 使用不同的频率和相位偏移，模拟图片中那种错落有致的随机感
        let off = ballId * 1.25;
        let cx = Math.sin(time * speed * 0.7 + off) * radius;
        let cy = Math.cos(time * speed * 0.5 + off * 1.5) * radius;
        let cz = Math.sin(time * speed * 0.9 + off * 2.1) * (radius * 0.5);
        
        // 特殊处理：让第一个球（模拟中间的镜面球）位置相对稳定在前方
        if (ballId === 0) {
        cx = Math.sin(time * 0.2) * 20;
        cy = Math.cos(time * 0.2) * 20;
        cz = radius * 0.8;
        }
        
        // 3. 应用位置变换
        target.set(lx + cx, ly + cy, lz + cz);
        
        // 4. 设置颜色（参考图中的色彩分布）
        let h = 0, s = 0.8, l = 0.5;
        if (ballId === 0) { // 镜面球：银灰色/浅白
        h = 0; s = 0; l = 0.8;
        } else if (ballId === 1) { // 蓝色
        h = 0.6;
        } else if (ballId === 2) { // 蓝绿色/青色
        h = 0.5;
        } else if (ballId === 3) { // 亮绿色
        h = 0.3;
        } else if (ballId === 4) { // 蓝紫色
        h = 0.7;
        }
        
        // 增加基于距离的呼吸感闪烁
        const shimmer = Math.sin(time * 2 + i * 0.1) * 0.1;
        color.setHSL(h, s, l + shimmer);
        
        if (i === 0) {
        setInfo("Sculpture Swarm", "Inspired by modern art installation. 5 dense particle spheres with independent orbital paths and distinct material colors.");
        }
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate={true} />
        <Effects disableGamma>
            <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}