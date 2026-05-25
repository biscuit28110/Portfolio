'use client';

import { useEffect, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import { ProjectScene } from './ProjectScene';
import { SceneProgressIndicator } from './SceneProgressIndicator';

export function ProjectsStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scenes = projects.map((p) => document.getElementById(`scene-${p.slug}`)).filter(Boolean) as HTMLElement[];

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = entry.target.id.replace('scene-', '');
            const idx = projects.findIndex((p) => p.slug === slug);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: '-30% 0px -35% 0px' }
    );

    const stackObserver = new IntersectionObserver(
      ([entry]) => setIndicatorVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    scenes.forEach((s) => sceneObserver.observe(s));
    if (stackRef.current) stackObserver.observe(stackRef.current);

    return () => {
      sceneObserver.disconnect();
      stackObserver.disconnect();
    };
  }, []);

  return (
    <>
      <SceneProgressIndicator
        projects={projects}
        activeIndex={activeIndex}
        visible={indicatorVisible}
      />

      <div
        ref={stackRef}
        id="projStack"
        style={{ position: 'relative', background: '#020617' }}
      >
        {projects.map((project, i) => (
          <ProjectScene key={project.slug} project={project} index={i + 1} total={projects.length} />
        ))}
      </div>
    </>
  );
}
