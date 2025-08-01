import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import './Hero3D.css';

// 3D Model Component
const Hero3DModel = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Main Cube */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#7461ff"
            metalness={0.8}
            roughness={0.2}
            emissive="#1a1a2e"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Smaller orbiting cubes */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 4,
              Math.sin((i / 8) * Math.PI * 2) * 2,
              Math.sin((i / 8) * Math.PI * 2) * 2
            ]}
            rotation={[i, i * 0.5, 0]}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#06b6d4" : "#10b981"}
              metalness={0.9}
              roughness={0.1}
              emissive={i % 2 === 0 ? "#0891b2" : "#059669"}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </Float>
      
      {/* Additional floating geometric shapes */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[-5, 2, -3]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#f59e0b"
            metalness={0.7}
            roughness={0.3}
            emissive="#d97706"
            emissiveIntensity={0.15}
          />
        </mesh>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.7} floatIntensity={0.6}>
        <mesh position={[5, -2, -2]}>
          <tetrahedronGeometry args={[1.2]} />
          <meshStandardMaterial
            color="#ef4444"
            metalness={0.6}
            roughness={0.4}
            emissive="#dc2626"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.0}>
        <mesh position={[0, 3.5, -4]}>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.9}
            roughness={0.1}
            emissive="#7c3aed"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
      
      {/* Particles */}
      <Particles />
    </group>
  );
};

// Particle System
const Particles = () => {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#7461ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="hero-3d">
      <div className="hero-3d-bg">
        <Canvas className="hero-canvas">
          <PerspectiveCamera makeDefault fov={75} position={[0, 0, 8]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* 3D Model */}
          <Hero3DModel />
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>
      
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Premium 3D Models
            <br />
            <span className="gradient-text">& Digital Assets</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Discover high-quality 3D designs, Blender models, and digital assets 
            for your creative projects. Professional-grade assets with instant download.
          </motion.p>
          
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.button
              className="btn btn-primary hero-cta"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(116, 97, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.querySelector('.featured-products').scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Explore Collection
            </motion.button>
            
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.location.href = '/contact';
              }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero3D;
