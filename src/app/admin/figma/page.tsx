import ProjectsManager from '@/components/admin/ProjectsManager';

export default function AdminFigmaPage() {
  return (
    <ProjectsManager
      fixedCategory='Figma Design'
      title='Figma Designs'
      description='Shown on the Figma Design service page.'
      folder='figma'
      showLinks={false}
    />
  );
}
